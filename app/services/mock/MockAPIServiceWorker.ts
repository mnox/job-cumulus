import SearchController from '~/services/mock/controllers/SearchController';
import MockDatabaseProvider from '~/services/mock/MockDatabaseProvider';
import CustomerController from "./controllers/CustomerController"
import FormulaController from "./controllers/FormulaController"
import JobController from "./controllers/JobController"
import MaterialController from "./controllers/MaterialController"
import ToolController from "./controllers/ToolController"
import UserController from "./controllers/UserController"

export default class MockAPIServiceWorker {
  async handleApiRequest(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname
    const method = request.method
    
    try {
      // Users endpoints
      if (path === "/mock-api/users" && method === "GET") {
        const users = await UserController.index();
        return createJsonResponse(users);
      }
      
      if (path.match(/^\/mock-api\/users\/\d+$/) && method === "GET") {
        const id = Number.parseInt(path.split("/").pop() || "0");
        const user = await UserController.resourceById(id);
        return user
          ? createJsonResponse(user)
          : createErrorResponse("User not found", 404);
      }
      
      if (path === "/mock-api/users" && method === "POST") {
        const userData = await request.json()
        const newUser = await UserController.createResource(userData)
        return createJsonResponse(newUser, 201)
      }
      
      if (path.match(/^\/mock-api\/users\/\d+$/) && method === "PUT") {
        const id = Number.parseInt(path.split("/").pop() || "0")
        const userData = await request.json()
        const updatedUser = await UserController.updateResource(id, userData)
        return updatedUser ? createJsonResponse(updatedUser) : createErrorResponse("User not found", 404)
      }
      
      if (path.match(/^\/mock-api\/users\/\d+$/) && method === "DELETE") {
        const id = Number.parseInt(path.split("/").pop() || "0")
        const success = await UserController.deleteResource(id)
        return success ? createJsonResponse({ success: true }) : createErrorResponse("User not found", 404)
      }
      
      // Customers endpoints
      if (path === "/mock-api/customers" && method === "GET") {
        const customers = await CustomerController.index()
        return createJsonResponse(customers)
      }
      
      if (path.match(/^\/mock-api\/customers\/\d+$/) && method === "GET") {
        const id = Number.parseInt(path.split("/").pop() || "0")
        const customer = await CustomerController.resourceById(id)
        return customer ? createJsonResponse(customer) : createErrorResponse("Customer not found", 404)
      }
      
      if (path === "/mock-api/customers" && method === "POST") {
        const customerData = await request.json()
        const newCustomer = await CustomerController.createResource(customerData)
        return createJsonResponse(newCustomer, 201)
      }
      
      if (path.match(/^\/mock-api\/customers\/\d+$/) && method === "PUT") {
        const id = Number.parseInt(path.split("/").pop() || "0")
        const customerData = await request.json()
        const updatedCustomer = await CustomerController.updateResource(id, customerData)
        return updatedCustomer ? createJsonResponse(updatedCustomer) : createErrorResponse("Customer not found", 404)
      }
      
      if (path.match(/^\/mock-api\/customers\/\d+$/) && method === "DELETE") {
        const id = Number.parseInt(path.split("/").pop() || "0")
        const success = await CustomerController.deleteResource(id)
        return success ? createJsonResponse({ success: true }) : createErrorResponse("Customer not found", 404)
      }
      
      // Jobs endpoints
      if (path === "/mock-api/jobs" && method === "GET") {
        const jobs = await JobController.index()
        return createJsonResponse(jobs)
      }
      
      if (path.match(/^\/mock-api\/jobs\/\d+$/) && method === "GET") {
        const id = Number.parseInt(path.split("/").pop() || "0")
        const job = await JobController.resourceById(id)
        return job ? createJsonResponse(job) : createErrorResponse("Job not found", 404)
      }
      
      if (path === "/mock-api/jobs" && method === "POST") {
        const jobData = await request.json()
        const newJob = await JobController.createResource(jobData)
        return createJsonResponse(newJob, 201)
      }
      
      if (path.match(/^\/mock-api\/jobs\/\d+$/) && method === "PUT") {
        const id = Number.parseInt(path.split("/").pop() || "0")
        const jobData = await request.json()
        const updatedJob = await JobController.updateResource(id, jobData)
        return updatedJob ? createJsonResponse(updatedJob) : createErrorResponse("Job not found", 404)
      }
      
      if (path.match(/^\/mock-api\/jobs\/\d+$/) && method === "DELETE") {
        const id = Number.parseInt(path.split("/").pop() || "0")
        const success = await JobController.deleteResource(id)
        return success ? createJsonResponse({ success: true }) : createErrorResponse("Job not found", 404)
      }
      
      // Materials endpoints
      if (path === "/mock-api/materials" && method === "GET") {
        const materials = await MaterialController.index()
        return createJsonResponse(materials)
      }
      
      if (path.match(/^\/mock-api\/materials\/\d+$/) && method === "GET") {
        const id = Number.parseInt(path.split("/").pop() || "0")
        const material = await MaterialController.resourceById(id)
        return material ? createJsonResponse(material) : createErrorResponse("Material not found", 404)
      }
      
      if (path === "/mock-api/materials" && method === "POST") {
        const materialData = await request.json()
        const newMaterial = await MaterialController.createResource(materialData)
        return createJsonResponse(newMaterial, 201)
      }
      
      if (path.match(/^\/mock-api\/materials\/\d+$/) && method === "PUT") {
        const id = Number.parseInt(path.split("/").pop() || "0")
        const materialData = await request.json()
        const updatedMaterial = await MaterialController.updateResource(id, materialData)
        return updatedMaterial ? createJsonResponse(updatedMaterial) : createErrorResponse("Material not found", 404)
      }
      
      if (path.match(/^\/mock-api\/materials\/\d+$/) && method === "DELETE") {
        const id = Number.parseInt(path.split("/").pop() || "0")
        const success = await MaterialController.deleteResource(id)
        return success ? createJsonResponse({ success: true }) : createErrorResponse("Material not found", 404)
      }
      
      // Tools endpoints
      if (path === "/mock-api/tools" && method === "GET") {
        const tools = await ToolController.index()
        return createJsonResponse(tools)
      }
      
      if (path.match(/^\/mock-api\/tools\/\d+$/) && method === "GET") {
        const id = Number.parseInt(path.split("/").pop() || "0")
        const tool = await ToolController.resourceById(id)
        return tool ? createJsonResponse(tool) : createErrorResponse("Tool not found", 404)
      }
      
      if (path === "/mock-api/tools" && method === "POST") {
        const toolData = await request.json()
        const newTool = await ToolController.createResource(toolData)
        return createJsonResponse(newTool, 201)
      }
      
      if (path.match(/^\/mock-api\/tools\/\d+$/) && method === "PUT") {
        const id = Number.parseInt(path.split("/").pop() || "0")
        const toolData = await request.json()
        const updatedTool = await ToolController.updateResource(id, toolData)
        return updatedTool ? createJsonResponse(updatedTool) : createErrorResponse("Tool not found", 404)
      }
      
      if (path.match(/^\/mock-api\/tools\/\d+$/) && method === "DELETE") {
        const id = Number.parseInt(path.split("/").pop() || "0")
        const success = await ToolController.deleteResource(id)
        return success ? createJsonResponse({ success: true }) : createErrorResponse("Tool not found", 404)
      }
      
      // Formulas endpoints
      if (path === "/mock-api/formulas" && method === "GET") {
        const formulas = await FormulaController.index();
        return createJsonResponse(formulas);
      }
      
      if (path.match(/^\/mock-api\/formulas\/\d+$/) && method === "GET") {
        const id = Number.parseInt(path.split("/").pop() || "0");
        const formula = await FormulaController.resourceById(id);
        return formula ? createJsonResponse(formula) : createErrorResponse("Formula not found", 404);
      }
      
      if (path === "/mock-api/formulas" && method === "POST") {
        const formulaData = await request.json();
        const newFormula = await FormulaController.createResource(formulaData);
        return createJsonResponse(newFormula, 201);
      }
      
      if (path.match(/^\/mock-api\/formulas\/\d+$/) && method === "PUT") {
        const id = Number.parseInt(path.split("/").pop() || "0");
        const formulaData = await request.json();
        const updatedFormula = await FormulaController.updateResource(id, formulaData)
        return updatedFormula ? createJsonResponse(updatedFormula) : createErrorResponse("Formula not found", 404)
      }
      
      if (path.match(/^\/mock-api\/formulas\/\d+$/) && method === "DELETE") {
        const id = Number.parseInt(path.split("/").pop() || "0")
        const success = await FormulaController.deleteResource(id)
        return success ? createJsonResponse({ success: true }) : createErrorResponse("Formula not found", 404)
      }
      
      if (path === '/mock-api/search' && method === "GET") {
        const searchQuery = url.searchParams.get("q")
        
        if (!searchQuery || searchQuery.trim().length < 2) {
          return createJsonResponse([])
        }
        
        // Use the SearchController to perform the search
        const results = await SearchController.search(searchQuery);
        return createJsonResponse(results)
      }
      
      // If no route matches
      return createErrorResponse("Not Found", 404)
    } catch (error) {
      console.error("Error handling mock API request:", error)
      return createErrorResponse("Internal Server Error", 500)
    }
  }
}

// Helper functions
function createJsonResponse(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

function createErrorResponse(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

// Initialize the mock service worker
export async function initMockServiceWorker() {
  // Setup mock DB
  await MockDatabaseProvider.initDatabase();
  // Intercept fetch requests
  const originalFetch = window.fetch;
  // Probably a much better way to register this
  const worker = new MockAPIServiceWorker();
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const request = new Request(input, init)
    const url = new URL(request.url, window.location.origin)
    
    // Only intercept API requests
    if (url.pathname.startsWith("/mock-api")) {
      return worker.handleApiRequest(request);
    }
    
    // Pass through all other requests
    return originalFetch(input, init);
  }
  
  console.dir("Mock Service Worker initialized")
}

// Register the service worker
export function registerServiceWorker() {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/MockAPIServiceWorker.ts")
      .then((registration) => {
        console.dir("Mock Service Worker registered: ", registration.scope)
      })
      .catch((error) => {
        console.dir("Mock Service Worker registration failed: ", error)
      })
  })
}

// Call this function to initialize the mock service worker
export const setupMockApi = ()=> {
  registerServiceWorker();
  initMockServiceWorker();
}
