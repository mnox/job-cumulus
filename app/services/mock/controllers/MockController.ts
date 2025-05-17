export type WithNumericId = {
  id: number;
}

type IndexMethod<T> = () => Promise<T[]>;
type GetMethod<T> = (id: number) => Promise<T | null>;
type CreateMethod<T> = (data: Omit<T, 'id'>) => Promise<T>;
type UpdateMethod<T> = (id: number, patch: Partial<T>) => Promise<T | null>;
type DeleteMethod<T> = (id: number) => Promise<boolean>;

export default class MockController<T extends WithNumericId> {
  static pendingStorageUpdate: boolean = false;
  static dbName = 'cumulusMockStorage';
  static dbVersion = 1;
  static db: IDBDatabase | null = null;
  
  resourceKey!: string;
  mockResource!: T[];
  resources: T[] = [];
  
  constructor() {
    this.initDatabase().then(() => {
      this.loadResources();
    });
  }
  
  private async initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(MockController.dbName, MockController.dbVersion);
      
      request.onerror = (event) => {
        console.error("IndexedDB error:", event);
        reject("Failed to open database");
      };
      
      request.onsuccess = (event) => {
        MockController.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object stores for each resource type if they don't exist
        if (!db.objectStoreNames.contains(this.resourceKey)) {
          db.createObjectStore(this.resourceKey, { keyPath: 'id' });
        }
      };
    });
  }
  
  private async loadResources(): Promise<void> {
    try {
      const data = await this.getFromDB();
      this.resources = data.length ? this.formatResources(data) : this.formatResources(this.mockResource);
      
      // If no data exists, initialize with mock data
      if (data.length === 0 && this.mockResource.length > 0) {
        await this.saveToDB(this.mockResource);
      }
    } catch (error) {
      console.error("Error loading resources:", error);
      this.resources = this.formatResources(this.mockResource);
    }
  }
  
  private getFromDB(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!MockController.db) {
        return resolve([]);
      }
      
      try {
        const transaction = MockController.db.transaction([this.resourceKey], 'readonly');
        const objectStore = transaction.objectStore(this.resourceKey);
        const request = objectStore.getAll();
        
        request.onsuccess = () => {
          resolve(request.result || []);
        };
        
        request.onerror = (event) => {
          console.error("Error fetching from IndexedDB:", event);
          reject("Failed to fetch data");
        };
      } catch (error) {
        console.error("Transaction error:", error);
        reject(error);
      }
    });
  }
  
  private saveToDB(data: T[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!MockController.db) {
        return reject("Database not initialized");
      }
      
      try {
        const transaction = MockController.db.transaction([this.resourceKey], 'readwrite');
        const objectStore = transaction.objectStore(this.resourceKey);
        
        // Clear existing data
        const clearRequest = objectStore.clear();
        
        clearRequest.onsuccess = () => {
          // Add all resources
          data.forEach(item => {
            objectStore.add(item);
          });
        };
        
        transaction.oncomplete = () => {
          MockController.pendingStorageUpdate = false;
          resolve();
        };
        
        transaction.onerror = (event) => {
          console.error("Transaction error:", event);
          reject("Failed to save data");
        };
      } catch (error) {
        console.error("Save error:", error);
        reject(error);
      }
    });
  }
  
  public index: IndexMethod<T> = async () => {
    await this.initDatabase();
    await this.awaitStorageUpdate(false);
    
    return new Promise((resolve) => {
      setTimeout(async () => {
        // Refresh resources from DB to ensure we have the latest
        const data = await this.getFromDB();
        this.resources = this.formatResources(data);
        resolve([...this.resources]);
      });
    });
  }
  
  public resourceById: GetMethod<T> = async (id) => {
    await this.initDatabase();
    
    return new Promise((resolve) => {
      setTimeout(async () => {
        if (!MockController.db) {
          return resolve(null);
        }
        
        try {
          const transaction = MockController.db.transaction([this.resourceKey], 'readonly');
          const objectStore = transaction.objectStore(this.resourceKey);
          const request = objectStore.get(id);
          
          request.onsuccess = () => {
            const resource = request.result as T;
            resolve(resource ? { ...resource } : null);
          };
          
          request.onerror = () => {
            resolve(null);
          };
        } catch (error) {
          console.error("Error fetching resource by ID:", error);
          resolve(null);
        }
      }, 300);
    });
  }
  
  public createResource: CreateMethod<T> = async (data) => {
    await this.initDatabase();
    await this.awaitStorageUpdate(true);
    
    return new Promise((resolve) => {
      setTimeout(async () => {
        const newResource = {
          id: await this.getNextId(),
          ...data,
        } as T;
        
        this.resources.push(newResource);
        await this.saveToDB(this.resources);
        
        resolve({ ...newResource });
      }, 300);
    });
  }
  
  public updateResource: UpdateMethod<T> = async (id, patch) => {
    await this.initDatabase();
    await this.awaitStorageUpdate(true);
    
    return new Promise((resolve) => {
      setTimeout(async () => {
        const index = this.resources.findIndex((r) => r.id === id);
        if (index === -1) return resolve(null);
        
        const updatedResource = {
          ...this.resources[index],
          ...patch,
          id: this.resources[index].id, // Ensure ID doesn't change
        };
        
        this.resources[index] = updatedResource;
        await this.saveToDB(this.resources);
        
        resolve({ ...updatedResource });
      }, 300);
    });
  }
  
  public deleteResource: DeleteMethod<T> = async (id) => {
    await this.initDatabase();
    await this.awaitStorageUpdate(true);
    
    return new Promise((resolve) => {
      setTimeout(async () => {
        const index = this.resources.findIndex((material) => material.id === id);
        if (index === -1) {
          return resolve(false);
        }
        
        this.resources.splice(index, 1);
        await this.saveToDB(this.resources);
        
        resolve(true);
      }, 300);
    });
  }
  
  protected formatResources: (resources: T[]) => T[] = (r) => r as T[];
  
  private async getNextId(): Promise<number> {
    const resources = await this.getFromDB();
    return resources.length > 0
      ? Math.max(...resources.map((material) => material.id)) + 1
      : 1;
  }
  
  private async awaitStorageUpdate(queueNewUpdate: boolean) {
    return new Promise(resolve => {
      return this.resolveStorageUpdated(resolve, queueNewUpdate);
    });
  }
  
  private resolveStorageUpdated(resolve: any, queueNewUpdate: boolean) {
    if (MockController.pendingStorageUpdate) {
      setTimeout(() => this.resolveStorageUpdated(resolve, queueNewUpdate), 50);
      return;
    }
    
    // Ensure only one pending Promise can resolve at a time
    if (queueNewUpdate) {
      MockController.pendingStorageUpdate = true;
    }
    
    resolve(true);
  }
}