<template>
    <div>
        <div class="trangchu">
        <div class="gmail">
          <img
            alt="logo"
            style="width: 91px; height: 85px"
          />
          <h1>HI, HỒNG LÊ</h1>
          <p class="text_gmail">
            VietDoodleGallery muốn đảm bảo rằng chính bạn đang <br />
            cố gắng truy cập vào admin.vietdoodlegallery.com
          </p>
          <button class="add_email">
           
            <select id="email" name="email">
              <option value="email1@example.com">hongle1229@gmail.com</option>
              <option value="email2@example.com">xuanphong1@gmail.com</option>
              <option value="email3@example.com">dtm123@gmail.com</option>
              <!-- Add more options as needed -->
          </select>
          </button>
        </div>

        <div class="login">
          <p>
            Để tiếp tục, trước tiên, hãy đăng nhập để xác minh danh tính của bạn
          </p>
          <div class="form_field">
            <input type="password" class="form_input" placeholder=""/> 
            <label for="name" class="form_label">Nhập mật khẩu</label>
            <i class="fa-solid fa-eye-slash" id="hienmatkhau" onclick="hienmatkhau()"></i>
            <i class="fa-solid fa-eye" id="hienmatkhau" onclick="hienmatkhau()"></i>
          </div>
          <div class="check">
            <input type="checkbox" checked="checked" name="checked" />
            <p style="padding-left: 10px">Lưu đăng nhập</p>
          </div>

          <div class="forget">
            <a href="#" id="forget">Quên mật khẩu?</a>
            <button class="next"><a href="#" id="forget1">Tiếp theo</a></button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
</script>