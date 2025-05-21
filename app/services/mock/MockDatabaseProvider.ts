import { SearchableCustomerAttributes } from '~/data/customers/Customer';
import { SearchableJobAttributes } from '~/data/jobs/Job';
import { SearchableMaterialAttributes } from '~/data/materials/Material';
import { ResourceType } from '~/data/search/SearchResult';
import { mockCustomers } from '~/services/mock/data/customers';
import { mockFormulas } from '~/services/mock/data/formulas';
import { mockJobs } from '~/services/mock/data/jobs';
import { mockMaterials } from '~/services/mock/data/materials';
import { mockTools } from '~/services/mock/data/tools';
import { mockUsers } from '~/services/mock/data/users';

export interface MockStoreConfig {
  name: string;
  mockResource: any[];
  searchableAttributes?: string[];
  searchResourceType?: ResourceType;
  resourceTitleAttribute: string;
}

export default class MockDatabaseProvider {
  static dbName = 'cumulusMockStorage';
  static dbVersion = 1;
  static db: IDBDatabase;
  
  static stores: MockStoreConfig[] = [
    {
      name: 'customers',
      mockResource: mockCustomers,
      searchableAttributes: SearchableCustomerAttributes,
      searchResourceType: ResourceType.CUSTOMER,
      resourceTitleAttribute: 'email',
    },
    {
      name: 'formulas',
      mockResource: mockFormulas,
      resourceTitleAttribute: 'name',
    },
    {
      name: 'jobs',
      mockResource: mockJobs,
      searchableAttributes: SearchableJobAttributes,
      searchResourceType: ResourceType.JOB,
      resourceTitleAttribute: 'title',
    },
    {
      name: 'materials',
      mockResource: mockMaterials,
      searchableAttributes: SearchableMaterialAttributes,
      searchResourceType: ResourceType.MATERIAL,
      resourceTitleAttribute: 'name',
    },
    {
      name: 'tools',
      mockResource: mockTools,
      resourceTitleAttribute: 'name',
    },
    {
      name: 'users',
      mockResource: mockUsers,
      resourceTitleAttribute: 'name',
    },
  ];
  
  static async initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(MockDatabaseProvider.dbName, MockDatabaseProvider.dbVersion);
      
      request.onerror = (event) => {
        console.error("IndexedDB error:", event);
        reject("Failed to open database");
      };
      
      request.onsuccess = (event) => {
        MockDatabaseProvider.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        MockDatabaseProvider.initMockStorage(db);
      };
    });
  }
  
  static getSearchableStores(): MockStoreConfig[] {
    return MockDatabaseProvider.stores.filter(store => store.searchableAttributes?.length);
  }
  
  private static initMockStorage(db: IDBDatabase) {
    MockDatabaseProvider.stores.forEach(store => {
      const objectStore = db.createObjectStore(store.name, { keyPath: 'id' });
      store.searchableAttributes?.forEach(searchableAttribute => {
        objectStore.createIndex(searchableAttribute, searchableAttribute, {unique: false});
      });
      store.mockResource.forEach(r => objectStore.add(r));
    });
  }
}