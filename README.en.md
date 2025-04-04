# KiotViet Retail SDK

A TypeScript/JavaScript SDK for interacting with KiotViet's Public API Retail platform. This SDK provides an easy-to-use interface for managing customers, products, orders, and other resources in your KiotViet retail store.

![npm version](https://img.shields.io/npm/v/kiotviet-client-sdk)
![license](https://img.shields.io/npm/l/kiotviet-client-sdk)

## Features

- 🔐 Automatic token management with client credentials
- 📦 Complete TypeScript support with detailed type definitions
- 🚀 Promise-based async API
- 🛡️ Built-in error handling with specific error types
- 📝 Comprehensive documentation and examples
- ⚡ Automatic retry on rate limits (coming soon)

## Installation

```bash
npm install kiotviet-client-sdk
```

## Quick Start

```typescript
import { KiotVietClient } from "kiotviet-client-sdk";

// Initialize the client
const client = new KiotVietClient({
  clientId: "your_client_id",
  clientSecret: "your_client_secret",
  retailerName: "your_retailer_name"
});
```

## Authentication

This SDK uses OAuth 2.0 for authentication. You need to provide your `clientId`, `clientSecret`, and `retailerName` when initializing the client.

- The `retailerName` is the name of your store in KiotViet.
- The `clientId` and `clientSecret` are obtained from the KiotViet developer portal.

The SDK will automatically handle the token retrieval and storage for you.
The access token is stored in memory and will be used for all API requests. The SDK will automatically refresh the token when it expires.

- The token is valid for 1 hour, and the SDK will automatically refresh it when needed.
- The SDK will throw an error if the token cannot be refreshed, and you will need to handle this in your application.

## Usage Examples

### Working with Products

```typescript
// List products with pagination
const products = await client.products.list({
  pageSize: 20,
  includeInventory: true
});

// Get a specific product
const product = await client.products.getById(123);

// Create a new product
const newProduct = await client.products.create({
  code: "SP001",
  name: "Product Name",
  retailPrice: 100000,
  categoryId: 1
});

// Search products
const searchResults = await client.products.search("keyword");
```

### Managing Customers

```typescript
// List customers
const customers = await client.customers.list({
  pageSize: 20
});

// Create a customer
const newCustomer = await client.customers.create({
  name: "John Doe",
  contactNumber: "0909123456",
  email: "john@example.com"
});
```

### Working with Orders

```typescript
// List orders with date range
const orders = await client.orders.getByDateRange(
  "2024-01-01",
  "2024-01-31",
  { pageSize: 50 }
);

// Create an order
const newOrder = await client.orders.create({
  branchId: 1,
  customerId: 123,
  orderDetails: [
    {
      productId: 456,
      quantity: 2
    }
  ]
});
```

### Error Handling

The SDK throws `KiotVietApiError` for API-related errors. Handle them appropriately:

```typescript
try {
  const product = await client.products.getById(123);
} catch (error) {
  if (error instanceof KiotVietApiError) {
    console.error('API Error:', error.message, 'Code:', error.errorCode);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Pagination

Most list methods support pagination through `pageSize` and `currentItem` parameters:

```typescript
const firstPage = await client.products.list({
  pageSize: 20,
  currentItem: 0
});

const secondPage = await client.products.list({
  pageSize: 20,
  currentItem: 20
});
```

## Rate Limiting

The KiotViet API has rate limits. The SDK currently provides basic rate limit information through error responses. When you receive a rate limit error (429), it's recommended to implement exponential backoff in your application.

## TypeScript Support

This SDK is written in TypeScript and provides comprehensive type definitions for all API responses and parameters. Enable TypeScript in your project to get the full benefit of type checking and IDE autocompletion.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.
