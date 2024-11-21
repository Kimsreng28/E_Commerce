<template>
  <div class="profileContainer">
    <Navbar_Component />

    <!-- NAV WITH NAME -->
    <div class="navWithName">
      <Breadcrumb_Component />
      <div class="welcome">
        <p>Welcome to!</p>
        <p style="color: #564949">{{ firstName }} {{ lastName }}</p>
      </div>
    </div>

    <!-- TITLE -->
    <div class="titlePage">
      <p>Manage My Account</p>
    </div>

    <div class="showInfo">
      <div class="select">
        <Button_Component
          name-button="My Profile"
          backgroundColor-button="#868181"
          height-button="60px"
          width-button="250px"
          color-button="#FFFFFF"
          icon="person"
        />
        <Button_Component
          style="margin-top: 2%"
          name-button="Logout"
          backgroundColor-button="#E5E0E0"
          height-button="60px"
          width-button="250px"
          color-button="#E41C1C"
          icon="logout"
          @click="handleLogout()"
        />
      </div>

      <!-- DASHBOARD -->
      <div class="dashboardEdit">
        <!-- EDIT PROFILE -->
        <div class="edit">
          <span class="material-icons">edit</span>
          <p>Edit Your Profile</p>
        </div>

        <!-- UPLOAD IMAGE -->
        <div class="uploadImage">
          <img :src="profileImageUrl" alt="" />
          <input type="file" @change="onImageUpload" v-if="isEditing" />
        </div>

        <!-- NAME -->
        <div class="name">
          <div class="firstName">
            <label for=""> First Name *</label>
            <input type="text" v-model="firstName" :readonly="!isEditing" />
          </div>
          <div class="lastName">
            <label for=""> Last Name *</label>
            <input type="text" v-model="lastName" :readonly="!isEditing" />
          </div>
        </div>

        <!-- EMAIL -->
        <div class="email">
          <div class="emailInput">
            <label for=""> Email *</label>
            <input type="text" v-model="email" :readonly="!isEditing" />
          </div>

          <div class="address">
            <label for=""> Address</label>
            <input type="text" v-model="address" :readonly="!isEditing" />
          </div>
        </div>

        <!-- PASSWORD -->
        <div class="password">
          <div class="currentPassword">
            <label for=""> Current Password</label>
            <input
              type="password"
              placeholder="Current Password"
              v-model="currentPassword"
              :readonly="!isEditing"
            />
          </div>

          <div class="newPassword">
            <label for=""> New Password</label>
            <input
              type="password"
              placeholder="New Password"
              v-model="newPassword"
              :readonly="!isEditing"
            />
          </div>

          <div class="confirmPassword">
            <label for=""> Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              v-model="confirmPassword"
              :readonly="!isEditing"
            />
          </div>
        </div>

        <!-- BUTTON -->
        <div class="button">
          <Button_Component
            name-button="Edit"
            backgroundColor-button="#958383"
            height-button="50px"
            width-button="200px"
            color-button="#FFFFFF"
            icon="edit"
            v-if="!isEditing"
            @click="isEditing = true"
          />
        </div>
        <div class="saveAndCancel" v-if="isEditing">
          <Button_Component
            name-button="Save"
            backgroundColor-button="#958383"
            height-button="50px"
            width-button="150px"
            color-button="#FFFFFF"
            icon="save"
            v-if="isEditing"
            @click="saveInformation"
          />
          <Button_Component
            name-button="Cancel"
            backgroundColor-button="#958383"
            height-button="50px"
            width-button="150px"
            color-button="#E41C1C"
            icon="cancel"
            @click="cancelEdit"
          />
        </div>
      </div>
    </div>

    <Footer_Component style="margin-left: 1%" />
  </div>
</template>

<script>
import Breadcrumb_Component from "@/components/Breadcrumb_Component.vue";
import Button_Component from "@/components/Button_Component.vue";
import Footer_Component from "@/components/Footer_Component.vue";
import Navbar_Component from "@/components/Navbar_Component.vue";
import { useUserSignupStore } from "@/stores/useUserSignupStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import defaultProfileImage from "../assets/images/CardFuture/profile.png";

export default {
  name: "ProfileAccountView",
  components: {
    Navbar_Component,
    Breadcrumb_Component,
    Button_Component,
    Footer_Component,
  },
  setup() {
    const userStore = useUserSignupStore();
    const router = useRouter();

    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const address = ref("");
    const currentPassword = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const profileImageUrl = ref(
      localStorage.getItem("profileImage") || defaultProfileImage
    );
    const isEditing = ref(false);

    onMounted(() => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        firstName.value = currentUser.firstName || "";
        lastName.value = currentUser.lastName || "";
        email.value = currentUser.email || "";
        address.value = currentUser.address || "";
        profileImageUrl.value =
          localStorage.getItem("profileImage") || defaultProfileImage;
      }
    });

    const handleLogout = () => {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("profileImage");
      profileImageUrl.value = defaultProfileImage;
      userStore.currentUser = null;
      router.push({ path: "/signIn" });
    };

    const onImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          profileImageUrl.value = reader.result;
          localStorage.setItem("profileImage", reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const saveInformation = () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const users = JSON.parse(localStorage.getItem("users")) || [];

      if (currentPassword.value || newPassword.value || confirmPassword.value) {
        if (currentUser.password !== currentPassword.value) {
          alert("Incorrect current password");

          return;
        }

        if (newPassword.value !== confirmPassword.value) {
          alert("New password and confirm password do not match");
          return;
        }
      }
      const updatedUser = {
        ...currentUser,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        address: address.value,
        profileImageUrl: profileImageUrl.value,
        password: newPassword.value || currentUser.password,
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      userStore.currentUser = updatedUser;
      const userIndex = users.findIndex(
        (user) => user.email === currentUser.email
      );
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
      }
      localStorage.setItem("users", JSON.stringify(users));

      currentPassword.value = "";
      newPassword.value = "";
      confirmPassword.value = "";

      isEditing.value = false;
      alert("Profile updated successfully");
    };

    const cancelEdit = () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        firstName.value = currentUser.firstName || "";
        lastName.value = currentUser.lastName || "";
        email.value = currentUser.email || "";
        address.value = currentUser.address || "";
      }
      profileImageUrl.value =
        localStorage.getItem("profileImage") || "default-image.png";
      isEditing.value = false;
    };

    return {
      firstName,
      lastName,
      email,
      handleLogout,
      saveInformation,
      cancelEdit,
      address,
      currentPassword,
      newPassword,
      confirmPassword,
      isEditing,
      profileImageUrl,
      onImageUpload,
    };
  },
};
</script>

<style scoped>
.profileContainer {
  width: 100%;
  height: 100vh;
  margin-top: 2%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.navWithName {
  width: 98%;
  margin-top: 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.welcome {
  width: 100%;
  display: flex;
  justify-content: end;
  flex-direction: row;
  gap: 10px;
}
.welcome p {
  font-family: Quicksand, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 45px;
  color: #000000;
}

.titlePage {
  width: 98%;
  margin-top: 2%;
  margin-left: 2.5%;
  display: flex;
  justify-content: start;
  flex-direction: row;
}
.titlePage p {
  font-family: Quicksand, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  color: #000000;
}

.showInfo {
  width: 100%;
  margin-top: 5%;
  margin-left: 2.5%;
  gap: 2%;
  display: flex;
  justify-content: start;
  flex-direction: row;
}

.select {
  display: flex;
  justify-content: start;
  flex-direction: column;
  background-color: #ede7e7;
  border-radius: 10px;
  padding: 1%;
}

.dashboardEdit {
  display: flex;
  width: 76%;
  height: auto;
  padding: 1%;
  border-radius: 10px;
  flex-direction: column;
  background-color: #ede7e7;
}
.name {
  width: 100%;
  margin-top: 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2%;
}
.email {
  width: 100%;
  margin-top: 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2%;
}
.password {
  width: 100%;
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  gap: 2%;
}
.button {
  display: flex;
  justify-content: end;
  margin-top: 3%;
  margin-bottom: 3%;
}

.firstName,
.lastName,
.emailInput,
.address {
  width: 45%;
}

.currentPassword,
.newPassword,
.confirmPassword {
  display: flex;
  flex-direction: column;
  gap: 2%;
  width: 45%;
}

.firstName label,
.lastName label,
.emailInput label,
.address label,
.currentPassword label,
.newPassword label,
.confirmPassword label {
  font-family: Quicksand, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 45px;
  color: #000000;
}

.firstName input,
.lastName input,
.emailInput input,
.address input,
.currentPassword input,
.newPassword input,
.confirmPassword input {
  border-radius: 5px;
  padding: 1.5%;
  width: 100%;
  height: 40px;
  font-size: 14px;
  font-family: Quicksand, sans-serif;
  font-weight: 500;
  background: #ffffff;
  border: 1px solid #958383;
  transition: background-color 0.3s;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
}

.edit {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  width: 100%;
}

.edit span {
  font-size: 12px;
  color: #9e9e9e;
}
.edit p {
  font-size: 12px;
  color: #9e9e9e;
  font-family: Quicksand, sans-serif;
  font-style: normal;
  font-weight: 500;
}

.uploadImage {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.uploadImage input {
  margin-top: 2%;
  margin-left: 6%;
  font-family: Quicksand, sans-serif;
}

.uploadImage img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 2px solid #9e9e9e;
}

.saveAndCancel {
  display: flex;
  justify-content: end;
  flex-direction: row;
  gap: 2%;
  margin-top: 3%;
  margin-bottom: 3%;
}
</style>
