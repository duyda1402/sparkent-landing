# Kết nối form liên hệ với Google Form

Website gửi bốn trường `name`, `email`, `lookingFor`, `message` tới Google Apps Script. Script tạo một response trong Google Form; Google Form tự ghi response vào Google Sheet đã liên kết. Sau khi lưu, script gửi email thông báo đến địa chỉ cấu hình trong `NOTIFICATION_EMAIL`. Sheet có thể tải xuống dưới dạng Excel (`.xlsx`) khi cần; không cần chuyển đổi từng lần gửi.

## Chuẩn bị Google Form

Form phải có đúng bốn câu hỏi với tiêu đề và loại sau:

| Tiêu đề | Loại | Giá trị |
| --- | --- | --- |
| Họ và tên | Short answer | — |
| Email | Short answer | — |
| Lĩnh vực quan tâm | Dropdown | `STUDIO`, `ACADEMY`, `LABEL`, `COLLAB` |
| Mô tả dự án | Paragraph | — |

Trong tab **Responses**, liên kết form với Google Sheet và kiểm tra form đang nhận phản hồi. Nếu đang yêu cầu đăng nhập hoặc giới hạn mỗi người một lần gửi, hãy tắt các hạn chế đó cho form liên hệ công khai.

Link dạng `/d/e/.../viewform` là link người trả lời; **không** dùng phần ID trong link đó làm `FORM_ID`. Hàm `setupContactForm` bên dưới sẽ tự lưu đúng ID của form.

## Tạo Web App

1. Trong form đang mở bằng quyền chỉnh sửa, bấm menu **⋮** ở góc trên bên phải rồi chọn **Apps Script** (ngay dưới **Print**). Tạo project script và sao chép nội dung [Code.gs](./Code.gs) vào đó.
2. Trong thanh chọn hàm ở Script editor, chọn `setupContactForm` rồi bấm **Run** một lần và cấp quyền khi Google yêu cầu. Hàm sẽ lưu `FORM_ID` trong **Project Settings → Script properties**. Không chạy `doPost` trực tiếp từ editor.
3. Trong **Project Settings → Script properties**, thêm `NOTIFICATION_EMAIL` bằng địa chỉ nhận thông báo. Với cấu hình công ty hiện tại, dùng `booking@sparkent.vn`. Nếu thiếu property này, phản hồi vẫn vào Form/Sheet nhưng script sẽ bỏ qua email.
4. Chọn **Deploy → New deployment → Web app**. Chọn **Execute as: Me** và **Who has access: Anyone**, cấp quyền cho Forms và Mail khi Google yêu cầu. Sao chép URL kết thúc bằng `/exec`.
5. Ở máy dev, tạo `.env.local` từ `.env.example` rồi điền `VITE_CONTACT_FORM_ENDPOINT` bằng URL `/exec`. Khởi động lại `pnpm dev`. Trên máy build, DevOps tạo `.env` từ `.env.example`, điền URL `/exec` đang dùng, rồi chạy `pnpm build`. Chỉ commit `.env.example`; các file `.env` khác được Git bỏ qua. Nếu URL thay đổi, cập nhật biến này và build lại website.
6. Gửi một contact thử từ website, kiểm tra một dòng mới trong Sheet và email thông báo. Trạng thái thành công trên website chỉ xuất hiện khi script báo đã lưu response. Nếu email thông báo lỗi, response vẫn được lưu; kiểm tra **Executions** trong Apps Script để xem lỗi email.

Khi dùng tài khoản công ty, form/sheet và Apps Script nên thuộc tài khoản Google của công ty. Chạy `setupContactForm` trên form mới, đặt `NOTIFICATION_EMAIL` thành `booking@sparkent.vn`, deploy Web App bằng tài khoản có quyền chỉnh sửa form, rồi cập nhật URL `/exec` trong biến môi trường của website. Nếu chỉ sửa `NOTIFICATION_EMAIL` trong cùng một script, không cần đổi URL; nếu sửa mã script thì tạo version deployment mới.

## Kết quả kiểm thử dev

Ngày 2026-10-09: gửi thử từ website dev với tên `Codex Test`, lĩnh vực `STUDIO`. Website hiển thị trạng thái đã gửi sau phản hồi của Apps Script; người dùng xác nhận dòng thử đã xuất hiện trong Google Sheet và email thông báo đã đến hộp thư dev.

Ngày 2026-10-09: chuyển website dev sang Web App mới của tài khoản công ty. Lượt `Codex Company Test` đã được lưu trong Sheet công ty. Email ban đầu chưa đến vì project mới thiếu Script Property `NOTIFICATION_EMAIL`. Sau khi đặt property thành `booking@sparkent.vn`, lượt `Codex Company Mail Test` đã được người dùng xác nhận nhận email. DevOps sẽ cung cấp URL Web App qua `.env` trên máy build.
