src/
├── features/
│   ├── home/             # Trang Home (bao gồm cả UI + logic)
│   │   ├── HomePage.jsx
│   │   ├── homeSlice.js       # State riêng nếu có
│   │   └── homeAPI.js
│   ├── about/
│   │   └── AboutPage.jsx
│   ├── auth/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── authSlice.js
│   │   └── authAPI.js
├── components/            # Button, Modal, Input, các UI tái sử dụng
├── layouts/               # Layout chính (Header, Footer...)
├── services/              # axios hoặc API config chung
├── routes/                # Định nghĩa route cho từng trang
├── App.jsx
└── index.jsx
