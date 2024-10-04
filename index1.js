<body>
  <script>
    function getAnimalData()
    {fetch("https://fakeapi.it/api/vi/persons").then(function (response) {
      response.json().then(function (finalData) {
        console.log(finalData);
      });
    })}
     
    //OR

    async function getAnimalData(){
     const response = await fetch("https://fakeapi.it/api/vi/persons");
     const finalData = await response.json()
        console.log(finalData);
        document.getElementByid("userData").innerHTML = JSON.stringify(finalData); 
      }

  </script>
  <button onclick="getAnimalData()">get Animal Data</button>
</body>;
