<template>
  <div class="home">
    <div class="title">Work Ticket Generator</div>
    <div class="ticket-container">
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
        <vue-qrcode :value="qrcodeData" :color="{ dark: '#000000ff', light: '#ffffffff' }"
          type="image/png"></vue-qrcode>
      </div>
    </div>
    <div class="generate">
      <button class="generate-btn" @click="generateQRCode">Generate !</button>
    </div>
  </div>
</template>

<script>
import VueQrcode from "vue-qrcode"

export default {
  components: {
    VueQrcode,
  },
  data() {
    return {
      dataUrl: null,
      style: "Style",
      ticket_no: null,
      step: "???",
      bundle: "???",
      amount: "???",
      qty: "???",
      qrcodeData: "This is a default QRCode, please generate a new one!"
    }
  },
  methods: {
    generateQRCode() {
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
      }
      let styleList = ["Fashion", "Antique", "Formal", "Casual"]
      // let currencyList = ["$", "€", "£", "¥"];
      this.step = `${getRandomInt(1, 4)}-${getRandomInt(1, 4)}-${getRandomInt(1, 4)}`;
      this.style = styleList[getRandomInt(0, 4)]
      this.bundle = getRandomInt(1000, 10000);
      this.qty = getRandomInt(1, 30) * 100;
      // this.amount = `${currencyList[getRandomInt(0, 4)]} ${this.qty * getRandomInt(1, 30)}`;
      this.amount = this.qty * getRandomInt(1, 30);
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
    }
  },
}
</script>

<style scoped lang="scss">
.home {
  margin: 0;
  height: 100vh;
  background-color: #ffe3c8;

  .title {
    padding-top: 10vh;
    text-align: center;
    color: #fa7d00;
    font-size: 2.5vw;
    font-family: jfOpenhuninn;
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

  .generate {
    text-align: center;
    margin-top: 10vh;

    .generate-btn {
      font-family: CreteRound-Regular;
      width: 15vw;
      aspect-ratio: 3/1;
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
  }
}
</style>