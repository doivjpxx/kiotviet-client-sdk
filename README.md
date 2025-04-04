# KiotViet Retail SDK

A TypeScript/JavaScript SDK for interacting with KiotViet's Public API Retail platform. This SDK provides an easy-to-use interface for managing customers, products, and other resources in your KiotViet retail store.

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
  retailerName: "your_retailer_name",
});

// The SDK automatically handles token management!
```
