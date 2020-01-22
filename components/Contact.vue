<template>
  <div>
    <transition name="slide">
    <div id="floating-chat" class="sidebar-floating" v-if="showChat">
      <div class="sidebar-content">
        <div data-filter-list="chat-module-body" class="chat-module">
          <div class="chat-module-bottom">
            <h4 class="m-auto text-center pb-2 contact-head">
              Contact me
              <i class="fas fa-smile"></i>
            </h4>
            <div class="mb-2 text-center">
              <span class="font-light mr-1">
                <i class="fas fa-envelope mr-1"></i>olayiwolaodunsi@gmai.com
              </span>
              <br />
              <span class="font-light">
                <i class="fas fa-phone mr-1"></i>+2348113376030
              </span>
            </div>
            <form
              class="chat-form"
              name="contact-me"
              method="post"
              @submit.prevent="sendContact()"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              netlify
            >
              <input type="hidden" name="form-name" value="contact-me" />
              <div class="chat-form-buttons-left position-absolute"></div>
              <textarea
                v-model="form.message"
                name="message"
                placeholder="Type message"
                rows="3"
                class="form-control"
              ></textarea>
              <div class="chat-form-buttons">
                <div></div>
                <div class="btn-send">
                  <button class="btn" type="submit">
                    <i aria-hidden="true" class="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
              <div class="form-group mt-4">
                <input name="email" placeholder="Email" v-model="form.email" class="form-control" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <a class="float" @click="()=> showChat = !showChat">
      <i v-if="!showChat" class="fa fa-comment" id="chat-open-icon"></i>
      <i v-else class="fa fa-times" id="chat-close-icon"></i>
    </a>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data: () => {
    return {
      showChat: false,
      notifySuccess: false,
      form: {
        message: '',
        email: ''
      }
    }
  },
  created() {
    this.$eventBus.$on('hire-me-clicked', () => {
      this.showChat = true
    })
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },
    sendContact() {
      console.log(this.form)
      const axiosConfig = {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
      axios
        .post(
          '/',
          this.encode({
            'form-name': 'contact-me',
            ...this.form
          }),
          axiosConfig
        )
        .then(res => {
          this.contactSuccess()
        })
    },
    contactSuccess() {
      this.showChat = false
      this.form.message = ''
      this.form.email = ''
      this.toast('b-toaster-top-center', 'success')
    },
    toast(toaster, variant, append = false) {
      this.$bvToast.toast(
        `Thanks for contacting Olayiwola, I will get back to you ASAP`,
        {
          title: `Thanks, message sent`,
          toaster: toaster,
          variant,
          solid: true,
          appendToast: append
        }
      )
    }
  }
}
</script>
<style scoped>
.fa-smile{
  color: #FFC107;
}
.font-light {
  font-weight: 300;
  color: rgb(6, 6, 6);
}
.contact-head {
  color: #191842;
}
a.float {
  background-image: linear-gradient(to right, #4458dc 0%, #854fee 100%),
    radial-gradient(circle at top left, #4458dc, #854fee);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  text-decoration: none;
  cursor: pointer;
}
.float {
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: #4d547a;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  z-index: 100;
}
.sidebar-floating {
  right: 1.5rem;
  bottom: 8rem;
  border-radius: 1rem;
  box-shadow: 0 0.1875rem 3rem rgba(33, 37, 41, 0.1),
    0 0.1875rem 3rem rgba(205, 233, 221, 0.85);
  border: 0px solid #dee2e6;
  background: #fff;
  z-index: 1060;
  transition: opacity 0.35s ease, transform 0.35s ease !important;
  width: calc(100vw - 3rem);
  position: fixed;
}
.sidebar-content {
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.chat-module {
  padding: 1.125rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}
.chat-module-top {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: calc(100% - 3.5rem);
  position: relative;
}
.chat-module-bottom {
  position: relative;
  padding-top: 1rem;
  background: #fff;
}
.chat-module-body {
  width: 100%;
  position: absolute;
  top: 1rem;
  height: calc(100% - 4rem);
  overflow-y: auto;
  padding-right: 1.5rem;
}
.no-chat {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.no-chat h3 {
  margin: auto;
  text-align: center;
}
.chat-form {
  position: relative;
  display: flex;
  flex-direction: column;
}
.chat-form textarea {
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  max-height: 5rem;
  padding-right: 2.375rem;
  padding-left: 1rem;
  font-size: 0.875rem;
  display: block;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  font-weight: 400;
  line-height: 1.6;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s;
}
.chat-form-buttons {
  position: absolute;
  top: 105px;
  right: 1rem;
  display: flex;
  align-items: center;
}
.btn-send > button > i {
  color: #896ae5;
  font-size: 1.3rem;
}

.btn-send > button:focus,
.btn-send > button:active{
  box-shadow: unset;
}

.hide {
  display: none !important;
}
@media (min-width: 768px) {
  .sidebar-floating {
    width: 400px;
  }
}
</style>
