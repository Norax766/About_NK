async function detectVPN() {

  let score = 0;

  try {

    // =========================
    // IP + ASN + Hosting
    // =========================

    const res = await fetch("https://ipapi.is/");
    const data = await res.json();

    console.log(data);

    // VPN / Proxy flags
    if (data.is_proxy) score += 5;
    if (data.is_vpn) score += 5;
    if (data.is_tor) score += 10;

    // Hosting / datacenter
    if (data.company?.type === "hosting") score += 4;

    // ASN sospechoso
    const badASN = [
      "M247",
      "DIGITALOCEAN",
      "OVH",
      "AMAZON",
      "GOOGLE",
      "MICROSOFT",
      "CHOOPA",
      "VULTR"
    ];

    const asnName = (
      data.asn?.org || ""
    ).toUpperCase();

    if (
      badASN.some(v => asnName.includes(v))
    ) {
      score += 4;
    }

    // =========================
    // Timezone mismatch
    // =========================

    const timezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone;

    const country = data.location?.country_code;

    const mismatch = {
      "MX": "America",
      "US": "America",
      "JP": "Asia",
      "FR": "Europe"
    };

    if (
      mismatch[country] &&
      !timezone.includes(mismatch[country])
    ) {
      score += 2;
    }

    // =========================
    // WebRTC Leak Detection
    // =========================

    const rtc = await detectWebRTCLeak();

    if (rtc) {
      score += 5;
    }

    // =========================
    // Resultado
    // =========================

    console.log("VPN SCORE:", score);

    if (score >= 7) {

      document.body.innerHTML = `
        <div class="vpn-block">
          <h1>VPN detectada</h1>
          <p>Desactiva tu VPN o Proxy.</p>
        </div>
      `;

      document.body.style.background = "#0f1115";

    }

  } catch(err) {
    console.error(err);
  }

}

// =========================
// WEBRTC
// =========================

async function detectWebRTCLeak() {

  return new Promise(resolve => {

    const pc = new RTCPeerConnection({
      iceServers: []
    });

    pc.createDataChannel("");

    pc.createOffer()
      .then(offer => pc.setLocalDescription(offer));

    pc.onicecandidate = (event) => {

      if (!event || !event.candidate) {
        resolve(false);
        return;
      }

      const candidate = event.candidate.candidate;

      if (
        candidate.includes("relay") ||
        candidate.includes("srflx")
      ) {
        resolve(true);
      }
    };

  });

}

detectVPN();