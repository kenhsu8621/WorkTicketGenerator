<template>
  <div class="home" :class="{ 'home-alt': !isQRCode }">
    <div class="title" :class="{ 'title-alt': !isQRCode }">{{ isQRCode ? "QRCode" : "Barcode" }} Generator</div>
    <div class="ticket-container" v-if="isQRCode">
      <div class="ticket-info">
        <div class="style">{{ style }} - {{ ticket_no }}</div>
        <div class="row">
          <div class="item-left">Step<span class="number">{{ step }}</span></div>
          <div class="item-right">Bundle<span class="number">{{ bundle }}</span></div>
        </div>
        <div class="row">
          <div class="item-left">Amt.<span class="number">{{ amount }}</span></div>
          <div class="item-right">Qty.<span class="number qty">{{ qty }}</span></div>
        </div>
      </div>
      <div class="gap top"></div>
      <div class="gap bottom"></div>
      <div class="ticket-qrcode">
        <vue-qrcode :value="qrcodeData" :color="{ dark: '#000000ff', light: '#ffffffff' }" type="image/png"></vue-qrcode>
      </div>
    </div>
    <div class="barcode-container" v-if="!isQRCode">
      <vue3-barcode :value="barcodeData" :width="3" :height="80" :fontSize="30" class="barcode-style" />
    </div>
    <div class="generate">
      <button class="generate-btn" :class="{ 'btn-alt': !isQRCode }" v-if="isQRCode" @click="generateQRCode">Generate
        !</button>
      <button class="generate-btn half" :class="{ 'btn-alt': !isQRCode }" v-if="!isQRCode"
        @click="generateBarcode('loc')">LOC</button>
      <button class="generate-btn half right" :class="{ 'btn-alt': !isQRCode }" v-if="!isQRCode"
        @click="generateBarcode('sn')">SN</button>
      <br />
      <button class="generate-btn switch-btn" :class="{ 'btn-alt': !isQRCode }" @click="isQRCode = !isQRCode">Switch to {{
        isQRCode ? "Barcode" : "QRCode"
      }}</button>
    </div>
  </div>
</template>

<script>
import VueQrcode from "vue-qrcode";
import Vue3Barcode from "vue3-barcode";

export default {
  components: {
    VueQrcode,
    Vue3Barcode
  },
  data() {
    return {
      isQRCode: true,
      dataUrl: null,
      style: "Style",
      ticket_no: null,
      step: "???",
      bundle: "???",
      amount: "???",
      qty: "???",
      qrcodeData: "This is a default QRCode, please generate a new one!",
      barcodeData: "106,1,A,A"
    }
  },
  methods: {
    generateQRCode() {
      let styleList = ["Fashion", "Antique", "Formal", "Casual"]
      // let currencyList = ["$", "€", "£", "¥"];
      this.step = `${this.getRandomInt(1, 4)}-${this.getRandomInt(1, 4)}-${this.getRandomInt(1, 4)}`;
      this.style = styleList[this.getRandomInt(0, 4)]
      this.bundle = this.getRandomInt(1000, 10000);
      this.qty = this.getRandomInt(1, 30) * 100;
      // this.amount = `${currencyList[this.getRandomInt(0, 4)]} ${this.qty * this.getRandomInt(1, 30)}`;
      this.amount = this.qty * this.getRandomInt(1, 30);
      this.ticket_no = (Math.random() * 1000000000000).toFixed();

      this.qrcodeData = JSON.stringify({
        "style": this.style,
        "ticket_no": this.ticket_no,
        "step": this.step,
        "bundle": this.bundle,
        "amount": this.amount,
        "qty": this.qty,
      })
      console.log(this.qrcodeData);
    },
    generateBarcode(type) {
      if (type === "loc") this.barcodeData = `${this.getRandomInt(106, 110)},${this.getRandomInt(1, 4)},${this.getRandomInt(1, 3) === 1 ? "A" : "B"},${this.getRandomInt(1, 3) === 1 ? "A" : "B"}`
      else this.barcodeData = (Math.random() * 1000000000000).toFixed()
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }
  },
}
</script>

<style scoped lang="scss">
.home {
  margin: 0;
  height: 100vh;
  background-color: #ffe3c8;
  transition: .5s all ease-in-out;

  .title {
    padding-top: 10vh;
    text-align: center;
    color: #fa7d00;
    font-size: 2.5vw;
    font-family: jfOpenhuninn;
    transition: .5s all ease-in-out;
  }

  .title-alt {
    color: #45ace8;
  }

  .ticket-container {
    position: relative;
    width: 40vw;
    aspect-ratio: 3/1;
    margin: auto;
    margin-top: 5vh;
    border-radius: 20px;
    display: flex;
    color: #4b4b4b;
    box-shadow: rgba(239, 140, 19, 0.25) 2.4px 2.4px 3.2px;

    .ticket-info {
      flex: 3;
      background-color: #fff;
      padding: 20px;
      border-right: 4px dashed #ffe3c8;
      border-radius: 20px;

      .style {
        font-size: 2vw;
        font-weight: bold;
      }

      .row {
        display: flex;

        .item-left,
        .item-right {
          margin-top: 3vh;
          font-size: 1.5vw;

          .number {
            margin-left: 10px;
            color: #fa7d00;
            font-family: jfOpenhuninn;
            font-size: 1.2vw;
          }
        }

        .item-left {
          flex: 3;
        }

        .item-right {
          flex: 2
        }

      }
    }

    .gap {
      position: absolute;
      right: 24.3%;
      width: 50px;
      height: 50px;
      background-color: #ffe3c8;
      // background-color: #e6872f;
      border-radius: 50%;
    }

    .top {
      top: -25px;
    }

    .bottom {
      bottom: -25px
    }

    .ticket-qrcode {
      flex: 1;
      background-color: #fff;
      padding: 20px;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
      }
    }
  }

  .barcode-container {
    position: relative;
    width: 40vw;
    aspect-ratio: 3/1;
    margin: auto;
    margin-top: 5vh;
    border-radius: 20px;
    display: flex;
    background-color: #fff;
    color: #4b4b4b;
    box-shadow: rgba(19, 169, 239, 0.25) 2.4px 2.4px 3.2px;

    .barcode-style {
      margin: auto;
    }
  }

  .generate {
    text-align: center;
    margin-top: 10vh;

    .generate-btn {
      font-family: CreteRound-Regular;
      width: 15vw;
      height: 7vh;
      font-size: 2vw;
      border-radius: 1.5vw;
      border: 5px solid #db6d00;
      color: #fff;
      background-color: #fa7d00;
      cursor: pointer;
      box-shadow: rgba(239, 140, 19, 0.25) 0px 6px 12px -2px, rgba(132, 64, 16, 0.3) 0px 3px 7px -3px;
      transition: all 0.3s ease-in-out;

      &:hover {
        border: 5px solid #d36a00;
        background-color: #e97500;
      }
    }

    .btn-alt {
      border-color: #5bb5e8;
      background-color: #74c6f5;
      box-shadow: rgba(19, 169, 239, 0.25) 2.4px 2.4px 3.2px;
      transition: all 0.3s ease-in-out;

      &:hover {
        border: 5px solid #339cd8;
        background-color: #69c0f3;
      }
    }

    .switch-btn {
      width: 15vw;
      margin-top: 1vw;
      font-size: 1.5vw;
    }

    .half {
      width: 7vw;
    }

    .right {
      margin-left: 1vw;
    }
  }
}

.home-alt {
  background-color: #c5e7ff;
}
</style>