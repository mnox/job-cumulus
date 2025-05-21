import { ResourceType, type SearchResult } from '~/data/search/SearchResult';
import MockDatabaseProvider, { type MockStoreConfig } from '~/services/mock/MockDatabaseProvider';

export default class SearchController {
  // Search across multiple resource types using cursors
  public static async search(query: string): Promise<SearchResult[]> {
    return new Promise(async (resolve) => {
      if (!query || query.trim().length < 2) {
        return []
      }
      
      const searchTerm = query.toLowerCase()
      
      try {
        // Ensure the database is initialized
        if (!MockDatabaseProvider.db) {
          console.error("Database not initialized")
          return []
        }
        
        // Combine and limit results
        const result = await SearchController.aggregateSearch(searchTerm);
        resolve(result.slice(0, 10));
      } catch (error) {
        console.error("Error searching resources:", error)
        return []
      }
    });
  }
  
  private static async aggregateSearch(searchTerm: string): Promise<SearchResult[]> {
    return new Promise(async (resolve) => {
      try {
        const db = MockDatabaseProvider.db;
        const searchableStores = MockDatabaseProvider.getSearchableStores();
        const storeNames = searchableStores.map(st => st.name);
        
        const transaction = db.transaction(storeNames, "readonly");
        const results = await Promise.all(searchableStores.map(store => SearchController.getStoreResults(
          searchTerm,
          transaction,
          store,
        )));
        
        resolve(results.flat());
      } catch (error) {
        console.error("Error accessing customers store:", error)
        resolve([])
      }
    })
  }
  
  // Search customers using cursors
  private static async getStoreResults(searchTerm: string, transaction: IDBTransaction, mockStore: MockStoreConfig): Promise<SearchResult[]> {
    return new Promise(async (resolve) => {
      const store = transaction.objectStore( mockStore.name );
      const results = await Promise.all(mockStore.searchableAttributes!.map((attribute: string) => SearchController.getIndexResults(
        searchTerm,
        attribute,
        mockStore,
        store,
      )));
      
      resolve(results.flat());
    });
  }
  
  private static async getIndexResults(
    searchTerm: string,
    indexAttribute: string,
    mockConfig: MockStoreConfig,
    objectStore: IDBObjectStore,
  ): Promise<SearchResult[]> {
    return new Promise((resolve) => {
      const results: SearchResult[] = [];
      const index = objectStore.index(indexAttribute)
      const cursor = index.openCursor();
      
      cursor.onsuccess = (e) => {
        const cursorRequest = (e.target as IDBRequest).result as IDBCursorWithValue
        if (cursorRequest) {
          const resource = cursorRequest.value;
          const indexValue = (resource[indexAttribute] || '').toLowerCase();
          
          if(indexValue.length && indexValue.includes(searchTerm)) {
            results.push({
              id: resource.id,
              title: resource[mockConfig.resourceTitleAttribute],
              type: mockConfig.searchResourceType as ResourceType,
            });
          }
          
          cursorRequest.continue();
        } else {
          resolve(results);
        }
      }
      
      cursor.onerror = (e) => {
        console.error(e);
        resolve(results);
      }
    });
  }
}
