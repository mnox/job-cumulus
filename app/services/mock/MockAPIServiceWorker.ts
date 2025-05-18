import CustomerController from "./controllers/CustomerController"
import FormulaController from "./controllers/FormulaController"
import JobController from "./controllers/JobController"
import MaterialController from "./controllers/MaterialController"
import ToolController from "./controllers/ToolController"
import UserController from "./controllers/UserController"

export const matchTo = (
  collection: any[],
  source: any[],
  relationName: string,
  joinKey: string,
  sourceIdentifier: string = 'id',
) => {
  return collection.map(resource => ({
    ...resource,
    [relationName]: source.find(sr => sr[sourceIdentifier] === resource[joinKey] ),
  }));
}

// Handle API requests
export async function handleApiRequest(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const path = url.pathname
  const method = request.method
  
  console.dir(`Mock API: ${method} ${path}`)
  
  try {
    // Users endpoints
    if (path === "/mock-api/users" && method === "GET") {
      const users = await UserController.getAllUsers()
      return createJsonResponse(users)
    }
    
    if (path === "/mock-api/users/me" && method === "GET") {
      const currentUser = await UserController.getCurrentUser()
      return createJsonResponse(currentUser)
    }
    
    if (path.match(/^\/mock-api\/users\/\d+$/) && method === "GET") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const user = await UserController.getUserById(id)
      return user ? createJsonResponse(user) : createErrorResponse("User not found", 404)
    }
    
    if (path === "/mock-api/users" && method === "POST") {
      const userData = await request.json()
      const newUser = await UserController.createUser(userData)
      return createJsonResponse(newUser, 201)
    }
    
    if (path.match(/^\/mock-api\/users\/\d+$/) && method === "PUT") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const userData = await request.json()
      const updatedUser = await UserController.updateUser(id, userData)
      return updatedUser ? createJsonResponse(updatedUser) : createErrorResponse("User not found", 404)
    }
    
    if (path.match(/^\/mock-api\/users\/\d+$/) && method === "DELETE") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const success = await UserController.deleteUser(id)
      return success ? createJsonResponse({ success: true }) : createErrorResponse("User not found", 404)
    }
    
    // Customers endpoints
    if (path === "/mock-api/customers" && method === "GET") {
      const customers = await CustomerController.getAllCustomers()
      return createJsonResponse(customers)
    }
    
    if (path.match(/^\/mock-api\/customers\/\d+$/) && method === "GET") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const customer = await CustomerController.getCustomerById(id)
      return customer ? createJsonResponse(customer) : createErrorResponse("Customer not found", 404)
    }
    
    if (path === "/mock-api/customers" && method === "POST") {
      const customerData = await request.json()
      const newCustomer = await CustomerController.createCustomer(customerData)
      return createJsonResponse(newCustomer, 201)
    }
    
    if (path.match(/^\/mock-api\/customers\/\d+$/) && method === "PUT") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const customerData = await request.json()
      const updatedCustomer = await CustomerController.updateCustomer(id, customerData)
      return updatedCustomer ? createJsonResponse(updatedCustomer) : createErrorResponse("Customer not found", 404)
    }
    
    if (path.match(/^\/mock-api\/customers\/\d+$/) && method === "DELETE") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const success = await CustomerController.deleteCustomer(id)
      return success ? createJsonResponse({ success: true }) : createErrorResponse("Customer not found", 404)
    }
    
    // Jobs endpoints
    if (path === "/mock-api/jobs" && method === "GET") {
      const jobs = await JobController.getAllJobs()
      return createJsonResponse(jobs)
    }
    
    if (path.match(/^\/mock-api\/jobs\/\d+$/) && method === "GET") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const job = await JobController.getJobById(id)
      return job ? createJsonResponse(job) : createErrorResponse("Job not found", 404)
    }
    
    if (path === "/mock-api/jobs" && method === "POST") {
      const jobData = await request.json()
      const newJob = await JobController.createJob(jobData)
      return createJsonResponse(newJob, 201)
    }
    
    if (path.match(/^\/mock-api\/jobs\/\d+$/) && method === "PUT") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const jobData = await request.json()
      const updatedJob = await JobController.updateJob(id, jobData)
      return updatedJob ? createJsonResponse(updatedJob) : createErrorResponse("Job not found", 404)
    }
    
    if (path.match(/^\/mock-api\/jobs\/\d+$/) && method === "DELETE") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const success = await JobController.deleteJob(id)
      return success ? createJsonResponse({ success: true }) : createErrorResponse("Job not found", 404)
    }
    
    // Materials endpoints
    if (path === "/mock-api/materials" && method === "GET") {
      const materials = await new MaterialController().index()
      return createJsonResponse(materials)
    }
    
    if (path.match(/^\/mock-api\/materials\/\d+$/) && method === "GET") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const material = await new MaterialController().resourceById(id)
      return material ? createJsonResponse(material) : createErrorResponse("Material not found", 404)
    }
    
    if (path === "/mock-api/materials" && method === "POST") {
      const materialData = await request.json()
      const newMaterial = await new MaterialController().createResource(materialData)
      return createJsonResponse(newMaterial, 201)
    }
    
    if (path.match(/^\/mock-api\/materials\/\d+$/) && method === "PUT") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const materialData = await request.json()
      const updatedMaterial = await new MaterialController().updateResource(id, materialData)
      return updatedMaterial ? createJsonResponse(updatedMaterial) : createErrorResponse("Material not found", 404)
    }
    
    if (path.match(/^\/mock-api\/materials\/\d+$/) && method === "DELETE") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const success = await new MaterialController().deleteResource(id)
      return success ? createJsonResponse({ success: true }) : createErrorResponse("Material not found", 404)
    }
    
    // Tools endpoints
    if (path === "/mock-api/tools" && method === "GET") {
      const tools = await ToolController.getAllTools()
      return createJsonResponse(tools)
    }
    
    if (path.match(/^\/mock-api\/tools\/\d+$/) && method === "GET") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const tool = await ToolController.getToolById(id)
      return tool ? createJsonResponse(tool) : createErrorResponse("Tool not found", 404)
    }
    
    if (path === "/mock-api/tools" && method === "POST") {
      const toolData = await request.json()
      const newTool = await ToolController.createTool(toolData)
      return createJsonResponse(newTool, 201)
    }
    
    if (path.match(/^\/mock-api\/tools\/\d+$/) && method === "PUT") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const toolData = await request.json()
      const updatedTool = await ToolController.updateTool(id, toolData)
      return updatedTool ? createJsonResponse(updatedTool) : createErrorResponse("Tool not found", 404)
    }
    
    if (path.match(/^\/mock-api\/tools\/\d+$/) && method === "DELETE") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const success = await ToolController.deleteTool(id)
      return success ? createJsonResponse({ success: true }) : createErrorResponse("Tool not found", 404)
    }
    
    // Formulas endpoints
    if (path === "/mock-api/formulas" && method === "GET") {
      const formulas = await FormulaController.getAllFormulas()
      return createJsonResponse(formulas)
    }
    
    if (path.match(/^\/mock-api\/formulas\/\d+$/) && method === "GET") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const formula = await FormulaController.getFormulaById(id)
      return formula ? createJsonResponse(formula) : createErrorResponse("Formula not found", 404)
    }
    
    if (path === "/mock-api/formulas" && method === "POST") {
      const formulaData = await request.json()
      const newFormula = await FormulaController.createFormula(formulaData)
      return createJsonResponse(newFormula, 201)
    }
    
    if (path.match(/^\/mock-api\/formulas\/\d+$/) && method === "PUT") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const formulaData = await request.json()
      const updatedFormula = await FormulaController.updateFormula(id, formulaData)
      return updatedFormula ? createJsonResponse(updatedFormula) : createErrorResponse("Formula not found", 404)
    }
    
    if (path.match(/^\/mock-api\/formulas\/\d+$/) && method === "DELETE") {
      const id = Number.parseInt(path.split("/").pop() || "0")
      const success = await FormulaController.deleteFormula(id)
      return success ? createJsonResponse({ success: true }) : createErrorResponse("Formula not found", 404)
    }
    
    // If no route matches
    return createErrorResponse("Not Found", 404)
  } catch (error) {
    console.error("Error handling mock API request:", error)
    return createErrorResponse("Internal Server Error", 500)
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
export function initMockServiceWorker() {
  // Intercept fetch requests
  const originalFetch = window.fetch
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const request = new Request(input, init)
    const url = new URL(request.url, window.location.origin)
    
    // Only intercept API requests
    if (url.pathname.startsWith("/mock-api")) {
      return handleApiRequest(request)
    }
    
    // Pass through all other requests
    return originalFetch(input, init)
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
  setTimeout(() => {
    registerServiceWorker()
    initMockServiceWorker()
  });
}
