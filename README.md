# **KiotViet Retail SDK**

Một SDK được viết bằng TypeScript/JavaScript dùng để tương tác với nền tảng Public API của KiotViet. SDK này cung cấp giao diện dễ sử dụng để quản lý khách hàng, sản phẩm, đơn hàng và các tài nguyên khác trong cửa hàng bán lẻ của bạn trên hệ thống KiotViet.

![npm version](https://img.shields.io/npm/v/kiotviet-client-sdk)  
![license](https://img.shields.io/npm/l/kiotviet-client-sdk)

---

## **Tính năng nổi bật**

- 🔐 Quản lý token tự động với cơ chế xác thực bằng thông tin khách hàng (client credentials)  
- 📦 Hỗ trợ đầy đủ TypeScript với định nghĩa kiểu dữ liệu chi tiết  
- 🚀 API bất đồng bộ dựa trên Promise  
- 🛡️ Xử lý lỗi tích hợp với các loại lỗi cụ thể  
- 📝 Tài liệu đầy đủ và có ví dụ minh họa  
- ⚡ Tự động thử lại khi bị giới hạn tốc độ (rate limit) *(sắp ra mắt)*  

---

## **Cài đặt**

```bash
npm install kiotviet-client-sdk
```

---

## **Khởi động nhanh**

```typescript
import { KiotVietClient } from "kiotviet-client-sdk";

// Khởi tạo client
const client = new KiotVietClient({
  clientId: "your_client_id",
  clientSecret: "your_client_secret",
  retailerName: "your_retailer_name"
});
```

---

## **Xác thực**

SDK này sử dụng chuẩn OAuth 2.0 để xác thực. Bạn cần cung cấp `clientId`, `clientSecret` và `retailerName` khi khởi tạo đối tượng client.  

- `retailerName` là tên cửa hàng của bạn trên hệ thống KiotViet.  
- `clientId` và `clientSecret` được lấy từ cổng dành cho nhà phát triển (developer portal) của KiotViet.  

SDK sẽ tự động xử lý việc lấy và lưu trữ access token cho bạn.  
Access token được lưu trong bộ nhớ và sẽ được sử dụng cho tất cả các yêu cầu API.  

- Token có hiệu lực trong vòng **1 giờ** và SDK sẽ **tự động làm mới** khi token hết hạn.  
- Nếu không thể làm mới token, SDK sẽ phát sinh lỗi và bạn cần xử lý tình huống này trong ứng dụng của mình.

---

## **Ví dụ sử dụng**

### **Làm việc với sản phẩm**

```typescript
// Danh sách sản phẩm với phân trang
const products = await client.products.list({
  pageSize: 20,
  includeInventory: true
});

// Lấy thông tin một sản phẩm cụ thể
const product = await client.products.getById(123);

// Tạo sản phẩm mới
const newProduct = await client.products.create({
  code: "SP001",
  name: "Tên Sản Phẩm",
  retailPrice: 100000,
  categoryId: 1
});

// Tìm kiếm sản phẩm
const searchResults = await client.products.search("từ khóa");
```

### **Quản lý khách hàng**

```typescript
// Danh sách khách hàng
const customers = await client.customers.list({
  pageSize: 20
});

// Tạo khách hàng mới
const newCustomer = await client.customers.create({
  name: "John Doe",
  contactNumber: "0909123456",
  email: "john@example.com"
});
```

### **Làm việc với đơn hàng**

```typescript
// Lấy danh sách đơn hàng trong khoảng thời gian
const orders = await client.orders.getByDateRange(
  "2024-01-01",
  "2024-01-31",
  { pageSize: 50 }
);

// Tạo đơn hàng mới
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

---

## **Xử lý lỗi**

SDK sẽ đưa ra lỗi `KiotVietApiError` cho các lỗi liên quan đến API. Cần xử lý lỗi một cách phù hợp như sau:

```typescript
try {
  const product = await client.products.getById(123);
} catch (error) {
  if (error instanceof KiotVietApiError) {
    console.error('Lỗi API:', error.message, 'Mã lỗi:', error.errorCode);
  } else {
    console.error('Lỗi không xác định:', error);
  }
}
```

---

## **Phân trang**

Hầu hết các phương thức liệt kê đều hỗ trợ phân trang thông qua các tham số `pageSize` và `currentItem`:

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

---

## **Giới hạn tốc độ truy cập (Rate Limiting)**

API của KiotViet có áp dụng giới hạn tốc độ. SDK hiện tại cung cấp thông tin cơ bản về giới hạn tốc độ qua các phản hồi lỗi. Khi nhận được lỗi 429 (quá giới hạn), bạn nên triển khai cơ chế backoff theo cấp số nhân trong ứng dụng của mình.

---

## **Hỗ trợ TypeScript**

SDK này được viết bằng TypeScript và cung cấp định nghĩa kiểu đầy đủ cho tất cả phản hồi và tham số của API. Kích hoạt TypeScript trong dự án của bạn để tận dụng toàn bộ khả năng kiểm tra kiểu và hỗ trợ từ IDE.

---

## **Đóng góp**

Rất hoan nghênh các đóng góp! Vui lòng gửi Pull Request nếu bạn muốn đóng góp vào dự án.

---

## **Giấy phép**

Giấy phép MIT – xem thêm trong tệp [LICENSE](LICENSE) để biết chi tiết.
