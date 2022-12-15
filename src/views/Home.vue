<template>
  <div class="home">
    <div class="title">Work Ticket Generator</div>
    <div class="ticket-container">
      <div class="ticket-info">
        <div class="style">{{ style }}</div>
        <div class="row">
          <div class="item-left">Step <span class="number">{{ step }}</span></div>
          <div class="item-right">Bundle<span class="number">{{ bundle }}</span></div>
        </div>
        <div class="row">
          <div class="item-left">Amt.<span class="number">{{ amt }}</span></div>
          <div class="item-right">QTY<span class="number qty">{{ qty }}</span></div>
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
      step: "???",
      bundle: "???",
      amt: "???",
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
      let step;
      let styleList = ["Fashion", "Antique", "Formal", "Casual"]
      let currencyList = ["$", "€", "£", "¥"];
      step = getRandomInt(1, 4)
      if (step === 1) {
        this.step = "1-2-5";
      } else if (step === 2) {
        this.step = "Waiting For Input"
      } else {
        this.step = "N/A"
      }
      this.style = styleList[getRandomInt(0, 4)]
      this.bundle = getRandomInt(1000, 10000);
      this.qty = getRandomInt(1, 30) * 100;
      this.amt = `${currencyList[getRandomInt(0, 4)]} ${this.qty * getRandomInt(1, 30)}`;

      this.qrcodeData = JSON.stringify({
        "style": this.style,
        "step": this.step,
        "bundle": this.bundle,
        "amt": this.amt,
        "qty": this.qty,
      })
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
    box-shadow: rgba(239, 140, 19, 0.25) 0px 6px 12px -2px, rgba(132, 64, 16, 0.3) 0px 3px 7px -3px;

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