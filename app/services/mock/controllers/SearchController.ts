import { ResourceType, type SearchResult } from '~/data/search/SearchResult';
import MockController, { type MockStoreConfig } from "~/services/mock/controllers/MockController"

export default class SearchController {
  // Search across multiple resource types using cursors
  public static async search(query: string): Promise<SearchResult[]> {
    if (!query || query.trim().length < 2) {
      console.dir('sigh');
      return []
    }
    
    const searchTerm = query.toLowerCase()
    
    try {
      // Ensure the database is initialized
      if (!MockController.db) {
        console.error("Database not initialized")
        return []
      }
      
      // Combine and limit results
      const result = await SearchController.aggregateSearch(searchTerm);
      console.dir({
        searchQuery: searchTerm,
        searchResult: result,
      });
      return result.slice(0, 10);
    } catch (error) {
      console.error("Error searching resources:", error)
      return []
    }
  }
  
  private static async aggregateSearch(searchTerm: string): Promise<SearchResult[]> {
    return new Promise(async (resolve) => {
      try {
        const db = MockController.db;
        const searchableStores = MockController.getSearchableStores();
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
      const results = await Promise.all(mockStore.searchableAttributes!.map(attribute => SearchController.getIndexResults(
        searchTerm,
        attribute,
        store,
      )));
      
      resolve(results.flat());
    });
  }
  
  private static async getIndexResults(searchTerm: string, indexAttribute: string, objectStore: IDBObjectStore): Promise<SearchResult[]> {
    return new Promise((resolve) => {
      const results: SearchResult[] = [];
      if (objectStore.indexNames.contains("name")) {
        const index = objectStore.index(indexAttribute)
        const range = IDBKeyRange.bound(
          searchTerm,
          `${searchTerm}"\uffff"`,
        )
        
        const cursor = index.openCursor(range)
        
        cursor.onsuccess = (e) => {
          const cursorRequest = (e.target as IDBRequest).result as IDBCursorWithValue
          
          if (cursorRequest) {
            const customer = cursorRequest.value
            
            results.push({
              id: customer.id,
              title: customer.name,
              type: ResourceType.CUSTOMER,
            });
            
            cursorRequest.continue();
          } else {
            resolve(results);
          }
        }
        
        cursor.onerror = () => {
          console.error("Error searching customers by name");
          resolve(results);
        }
      }
    });
  }
}
