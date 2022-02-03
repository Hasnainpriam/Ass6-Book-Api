const loading = (show) =>{
   document.getElementById('spinner').style.display=show;
}
const error1 = (show) =>{
   document.getElementById('error1').style.display=show;
}
// const loading = (show) =>{
//    document.getElementById('spinner').style.display=show;
// }
const searchBook = () =>{
  const inputField=document.getElementById('input-field');
  const inputValue=inputField.value;
 
  if(inputField.value === ''){
    error1('block');
  }
  else{
  const url=`https://openlibrary.org/search.json?q=${inputValue}`
  fetch(url)
       .then(res => res.json())
       .then(data => displaySearchResult(data,inputValue))
       loading('block');
       error1('none');
  }
  inputField.value='';
  
}

const displaySearchResult = (data,value) => { 
  
  document.getElementById('total-found').innerText=`${data.numFound}`;
  const url=`https://openlibrary.org/search.json?q=${value}`
  fetch(url)
       .then(res => res.json())
       .then(data => searchResult(data.docs))
       
}

const searchResult = data =>{

const container=document.getElementById('container');  
container.innerHTML='';

data.forEach(item => {
const div=document.createElement('div');
div.classList.add='col';
div.innerHTML=`
             <div class="card h-100">
                   <img src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg" class="card-img-top" style="height:350px; alt="" />
                  <div class="card-body">
                   <h5 class="card-title">Title : ${item.title}</h5>
                   <p class="card-text">Author Name:${item.author_name}</p>
                   <p class="card-text">Publisher:${item.first_publish_year}</p>
                   <p class="card-text">First Publish Year:${item.publisher}</p>
                  </div>
             </div> `
    container.appendChild(div); 
    
});
loading('none');
}

