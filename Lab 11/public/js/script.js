$(document).ready(()=>{
   // let newContent=$('#deep');
 

    let requestConfig = {
        method: 'GET',
        url: 'http://api.tvmaze.com/shows',
        contentType: 'application/x-www-form-urlencoded',
       // data: JSON.stringify({  })
      };

    $.ajax(requestConfig).then( (responseMessage)=> {
       // console.log(responseMessage);
         $("showList").empty()
        $.each(responseMessage,(index,element)=>{
              
        // creating a tag
            var link = $("<a>");
            link.text(element.name);
            link.attr("href", element._links.self.href);
            link.addClass("link");
            
        //creating Li tag
            var listItem = $("<li/>");
            listItem.html(link)

        //linking a to tli tag
            listItem.appendTo('ul#showList')
        

        
            $('ul#showList').show()
            $('#show').hide()
        })
               //onclick of a tag
               $('a.link').click((e)=>{
                e.preventDefault();
                linkClicked(e.target.href)
             })
      });



    $("#searchForm").submit(function (event) {
        event.preventDefault();
      
        let error=$("#errors")
        let errorDiv=$("#error-div")
        
        let search_term =$("#search_term").val();

        if(!search_term || search_term.trim().length===0){
            
                let error2 ='<li>Please give a valid movie name. It cannot be empty</li>'
                error.append(error2);
                errorDiv.show()
        }
        else{
            $("#showList").empty()
            errorDiv.empty()

            let url = `http://api.tvmaze.com/search/shows?q=${search_term}`

            var requestConfig = {
                method: 'GET',
                url: url,
                contentType: 'application/x-www-form-urlencoded',
              };
            
            $.ajax(requestConfig).then((data)=>{
                $.each(data,(index,element)=>{
              
                    // creating a tag
                        var link = $("<a>");
                        link.text(element.show.name);
                        link.attr("href", element.show._links.self.href);
                        link.addClass("link");
                        
                    //creating Li tag
                        var listItem = $("<li/>");
                        listItem.html(link)
            
                    //linking a to li tag
                        listItem.appendTo('ul#showList')
                    

                    
                        $('ul#showList').show()
                        $('#show').hide()
                    })
                   //onclick of a tag
                   
                
                     $('a.link').click((e)=>{
                         e.preventDefault();
                     linkClicked(e.target.href)
                     })
                     $('#homeLink').show()
            })
            
        }
       
 
        //console.log(search_term)
       
      });


    const linkClicked=(url)=>{
        //console.log(url)
        var show =$('#show')
        $('ul#showList').hide()
        $('#show').empty()

        var requestConfig = {
            method: 'GET',
            url: url,
            contentType: 'application/x-www-form-urlencoded',
          };
        
          $.ajax(requestConfig).then((data)=>{
            
            let h1 = `<h1>${data.name}</h1>`
            let src= !data.image || !data.image.medium || data.image===null? "/public/static/no_image.jpeg":data.image.medium
            let img=`<img alt="Movie Poster" src='${src}' />`
            let dl= $('<dl></dl>')
            let language='<dt>Language</dt>'
            let genres='<dt>Genres</dt>'
            let summary='<dt>Summary</dt>'
            let network='<dt>Network</dt>'
            let averageRatings='<dt>Average Rating</dt>'

            let lang= !data.language?"N/A":data.language
            let languageData=`<dd>${lang}</dd>`
            
            
            let aR=  !data.rating || !data.rating.average || data.rating===null ?"N/A":data.rating.average
        
            
            let averageRatingsData=`<dd>${aR}</dd>`

            let nD= !data.network||!data.network.name||data.network===null?"N/A":data.network.name
            let networkData=`<dd>${nD}</dd>`

            let sD= !data.summary?"N/A":data.summary
            let summaryData=`<dd>${sD}</dd>`
            let dd=$('<dd></dd>')
            let ul=$('<ul></ul>')

            data.genres.map((element)=>{
                let li=$(`<li>${element}</li>`)
                ul.append(li)
            })
            dd.append(ul)

            dl.append(language)
            dl.append(languageData)
            dl.append(genres)
            dl.append(dd)
            dl.append(averageRatings)
            dl.append(averageRatingsData)
            dl.append(network)
            dl.append(networkData)
            dl.append(summary)
            dl.append(summaryData)
       


            //show appending
            show.append(h1)
            show.append(img)
            show.append(dl)
             show.show()
             $('#homeLink').show()
        //     // $.each(data,(index,element)=>{
          
        //     //     // creating a tag
        //     //         var link = $("<a>");
        //     //         link.text(element.show.name);
        //     //         link.attr("href", element.show._links.self.href);
        //     //         link.addClass("link");
                    
        //     //     //creating Li tag
        //     //         var listItem = $("<li/>");
        //     //         listItem.html(link)
        
        //     //     //linking a to li tag
        //     //         listItem.appendTo('ul#showList')
                
        //     //     //onclick of a tag
        //     //         $('a.link').click((e)=>{
        //     //            e.preventDefault();
        //     //            //linkClicked(element.show._links.self.href)
        //     //         })
                
        //     //         $('ul#showList').show()
        //     //         $('#show').hide()
        //     //     })
        })

    }
})