# 🧠 Siêu Trí Nhớ - Memory Training Game

Ứng dụng web rèn luyện trí nhớ với bộ mã hóa số 00-99 thông qua các hình ảnh gợi nhớ.

## 🎮 Tính năng

- **12 Game Mode** khác nhau để rèn luyện trí nhớ
- **Bộ mã hóa 00-99** với hình ảnh gợi nhớ
- **Hệ thống điểm số** và phần thưởng
- **Âm thanh** và hiệu ứng hình ảnh sống động
- **3D Background** với Three.js
- **Responsive Design** - hoạt động trên mọi thiết bị

## 🎯 Các Game Mode

1. **Hình → Số**: Xem hình ảnh, chọn số tương ứng
2. **Số → Hình**: Xem số, chọn hình ảnh đúng
3. **Flashcard**: Lật thẻ để học và ghi nhớ
4. **Thử Thách Tốc Độ**: Trả lời nhanh nhất có thể
5. **Cung Điện Trí Nhớ**: Gắn số vào các căn phòng
6. **Xây Dựng Câu Chuyện**: Tạo câu chuyện từ các số
7. **Nhớ Chuỗi**: Ghi nhớ và lặp lại chuỗi số
8. **Ghép Đôi**: Tìm và ghép cặp số với hình ảnh
9. **Khám Phá Phòng**: Khám phá phòng ngẫu nhiên
10. **Tấn Công Thời Gian**: Trả lời càng nhiều càng tốt
11. **Thử Thách Ngược**: Xem số, nhớ tên
12. **Nhận Diện Mẫu**: Tìm quy luật trong dãy số

## 🚀 Cài đặt và Chạy

### Local Development

1. Clone repository:
```bash
git clone https://github.com/tintamquy/sieutrinho.git
cd sieutrinho
```

2. Mở `index.html` trong trình duyệt hoặc sử dụng local server:
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server
```

3. Truy cập `http://localhost:8000`

## 📦 Cấu trúc Project

```
sieutrinho/
├── index.html          # File HTML chính
├── styles.css          # CSS với hiệu ứng 3D
├── app.js              # Logic ứng dụng chính
├── games.js            # Implementations của tất cả games
├── data.js             # Dữ liệu mã hóa 00-99
├── bomahoa/            # Folder chứa hình ảnh mã hóa
│   ├── 00 - Con Chó.jpg
│   ├── 01 - Con Trâu.jpg
│   └── ...
└── loci/               # Folder chứa hình ảnh loci
    ├── 00-20.jpg
    ├── 21-40.jpg
    └── 41-60.jpg
```

## 🌐 Deploy lên Cloudflare Pages

1. Push code lên GitHub repository
2. Vào Cloudflare Dashboard → Pages
3. Connect repository
4. Build settings:
   - Build command: (không cần)
   - Build output directory: `/` (root)
5. Deploy!

## 🎨 Công nghệ sử dụng

- **HTML5** - Cấu trúc
- **CSS3** - Styling với animations và 3D effects
- **JavaScript (Vanilla)** - Logic và game mechanics
- **Three.js** - 3D background effects
- **LocalStorage** - Lưu điểm số

## 📝 Bộ mã hóa

Mỗi số từ 00-99 được mã hóa bằng hình ảnh với tên bắt đầu bằng chữ cái tương ứng:
- 00 = CC = Con Chó
- 01 = CT = Con Trâu
- 10 = TC = Tổ Chim
- ...

## 🎯 Mục tiêu

Giúp người dùng:
- Nhìn số → nhớ hình ngay lập tức
- Nhìn hình → nhớ số ngay lập tức
- Rèn luyện phản xạ nhanh
- Ghi nhớ lâu dài thông qua các kỹ thuật memory palace

## 📄 License

MIT License

## 👤 Author

tintamquy

---

Made with ❤️ for memory training

