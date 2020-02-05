


var musicDB=new MusicDB();

function MusicDB(){
    this.init=function(){
        this.search();
    }

    this.search=function(){
        var $this=this;
        var form=document.querySelector("#form");
        form.addEventListener("submit",function(e){
            e.preventDefault();
            var value=document.querySelector("#input_search").value;
            form.reset()

            $this.getData(value);
        });

    }

    this.getData=function(artist){
        var $this=this;
        var http=new XMLHttpRequest();
        var url="https://itunes.apple.com/search?term="+artist+"&entity=album";
        var method="GET";
        var listOfAlbums=document.querySelector("#album_list_container");
        listOfAlbums.innerHTML="";
        
        http.open(method,url);

        http.onreadystatechange=function(){
            if(http.readyState===XMLHttpRequest.DONE && http.status===200){
               $this.showArtist(JSON.parse(http.response));
            }
            // else if(http.readyState===XMLHttpRequest.DONE && http.status!==200){

            // }
        };
        
       http.send();
      
    }

    this.showArtist=function(data){
        var listOfAlbums=document.querySelector("#album_list_container");
        var notMatch=document.querySelector("#not_match");
        var template=""
        console.log(data.results);
        if(data.results.length>0){
            notMatch.style.display="none";
            for(var i=0;i<data.results.length;i++){
                template+='<div class="col-sm-3 album_item">'
                template+= '<div class="item_thmb" style="background:url('+ data.results[i].artworkUrl100+')"></div>'
                template+= '<div class="item_title">'+ data.results[i].collectionName +'</div>'
                template+= '<div class="item_price">'
                template+=  '<span>Price :</span> '+data.results[i].collectionPrice+' USD'
                template+= '</div>'
                template+='<a href="'+ data.results[i].collectionViewUrl +'" target="_blank">Buy now</a>'
                template+= '</div>'
             
            }
            listOfAlbums.innerHTML="";
            listOfAlbums.insertAdjacentHTML("afterbegin",template);
        }
        else{
            notMatch.style.display="block";
        }
    }

    this.init();
}