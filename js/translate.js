async function translateLyricsFast(){

  if(userLang === "en"){

    translatedLyrics = [...lyrics];
    return;
  }

  try{

    const fullText =
      lyrics.map(l => l.text).join(" ||| ");

    const chunks = [];

    let current = "";

    fullText.split(" ").forEach(word=>{

      if((current + word).length > 400){

        chunks.push(current);

        current = word + " ";

      } else {

        current += word + " ";
      }
    });

    if(current) chunks.push(current);

    let translatedText = "";

    for(const chunk of chunks){

      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|${userLang}`
      );

      const data = await res.json();

      translatedText +=
        data.responseData.translatedText + " ";
    }

    const translated =
      translatedText.split(" ||| ");

    translatedLyrics = lyrics.map((l,i)=>({

      time: l.time,

      text: translated[i] || l.text
    }));

  }catch{

    translatedLyrics = [...lyrics];
  }
}