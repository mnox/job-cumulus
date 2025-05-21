import MockDatabaseProvider from '~/services/mock/MockDatabaseProvider';

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
  
  public resourceKey!: string;
  public mockResource!: T[];
  resources: T[] = [];
  
  private getFromDB(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!MockDatabaseProvider.db) {
        return resolve([]);
      }
      
      try {
        const transaction = MockDatabaseProvider.db.transaction([this.resourceKey], 'readonly');
        const objectStore = transaction.objectStore(this.resourceKey);
        const request = objectStore.getAll();
        
        request.onsuccess = () => {
          const results = this.formatResources(request.result || []);
          resolve(results);
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
  
  private saveToDB(data: T[], clearExisting: boolean = false): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!MockDatabaseProvider.db) {
        return reject("Database not initialized");
      }
      
      try {
        const transaction = MockDatabaseProvider.db.transaction([this.resourceKey], 'readwrite');
        const objectStore = transaction.objectStore(this.resourceKey);
        
        if(clearExisting) {
          const clearRequest = objectStore.clear();
          
          clearRequest.onsuccess = () => {
            data.forEach(item => {
              objectStore.add(item);
            });
          };
        } else {
          data.forEach(item => {
            objectStore.add(item);
          });
        }
        
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
    return new Promise((resolve) => {
      setTimeout(async () => {
        if (!MockDatabaseProvider.db) {
          return resolve(null);
        }
        
        try {
          const transaction = MockDatabaseProvider.db.transaction([this.resourceKey], 'readonly');
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
    await this.awaitStorageUpdate(true);
    
    return new Promise(async (resolve) => {
      const index = this.resources.findIndex((r) => r.id === id);
      if (index === -1) return resolve(null);
      
      const updatedResource = {
        ...this.resources[index],
        ...patch,
        id: this.resources[index].id, // Ensure ID doesn't change
      };
      
      this.resources[index] = updatedResource;
      this.saveToDB(this.resources);
      
      resolve({ ...updatedResource });
    });
  }
  
  public deleteResource: DeleteMethod<T> = async (id) => {
    await this.awaitStorageUpdate(true);
    
    return new Promise((resolve) => {
      const index = this.resources.findIndex((material) => material.id === id);
      if (index === -1) {
        return resolve(false);
      }
      
      this.resources.splice(index, 1);
      this.saveToDB(this.resources);
      
      resolve(true);
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