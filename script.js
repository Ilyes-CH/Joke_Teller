
const button = document.getElementById('btn');
// const audio = document.getElementById('audio');


// passing joke to voice RSS API

    function tellMe(joke){
        const jokeString = joke.trim().replace(/ /g, '%20'); //trim to remove space
       try{     VoiceRSS.speech({
            key: '86e7efa939384dbd9be22d8da37a4aa3',
            src: jokeString,
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });}
        catch(error){
        console.log('voice RSS API Server 500', error);
        }
    // console.log('tell me a joke: ',joke);

}


    // get jokes from joke api

    async function getJokes(){
        try{
            const url = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
           const response =  await fetch(url);
            console.log(response);
            if(response.status != 200)
            {
                console.log('404 error');
                getJokes();
                }
            const data = await response.json() //from bson to json
            if(data.setup){
                joke = `${data.setup} ...${data.delivery}`
            }
            else{
             joke = data.joke 
            }
            // console.log(joke); 
            tellMe(joke);
        }
        catch(err){
            console.log(`there is an error: ${err}`)
        
        }
    }
button.addEventListener('click',getJokes);