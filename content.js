
document.querySelector('head').innerHTML = 
`<head><link rel="icon" type="image/png" sizes="32x32" href="https://laravel.com/img/favicon/favicon-32x32.png">
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/atom-one-dark.min.css">
</head>`;
document.querySelector('pre').innerHTML=document.querySelector('pre').innerHTML
    .replaceAll(/&gt;/g,'>')
    .replaceAll(/&lt;a/g,'<a')
    .replaceAll(/&lt;\/a/g,'<\/a')
    .replaceAll(/&lt;style/g,'<style')
    .replaceAll(/&lt;\/style/g,'<\/style')
    .replaceAll(/&lt;div/g,'<div')
    .replaceAll(/&lt;\/div/g,'<\/div')
    .replaceAll(/```html/g,'<code class="code language-php">')
    .replaceAll(/```[\S]+/g,'<code class="code">')
    .replaceAll(/```/g,'<\/code>')
    .replaceAll(/    (?!-)[\s\S]*?((\n[A-Z])|(\n#)|(\n>)|(\n<)|(\n$))/g
    ,function (x){
        let len = x.length;
        let last = (x.charAt(len-2) == "\n")?"":x.charAt(len-2);
        return '<div><pre><code class="language-php">'+x.substring(0,len-2)+last+'</code></div></pre>'+x.charAt(len-1);
    }
    )
    .replaceAll(/((^# )|(\n# ))[A-Z][\s\S]*?(\n)/g
        ,function (x){
            return '<h1>'+x.substring(2)+'</h1>';
        }
    )
    .replaceAll(/((^## )|(\n## ))[A-Z][\s\S]*?(\n)/g
        ,function (x){
            return '<div class="heading"><span class="tag">#</span><h2>'+x.substring(3)+'</h2></div>';
        }
    )
    .replaceAll(/((^### )|(\n### ))[A-Z][\s\S]*?(\n)/g
        ,function (x){
            return '<div class="heading"><span class="tag3">#</span><h3>'+x.substring(4)+'</h3></div>';
        }
    )
    .replaceAll(/####[\s\S]*?(\n)/g
        ,function (x){
            return '<h4>'+x.substring(5)+'</h4>';
        }
    )
    .replaceAll(/`[^`][\s\S]*?`/g
        ,function (x){
            return '<span class="inline-code">'+x.substring(1,x.length-1)+'</span>';
        }
    )
    .replaceAll(/\/docs\/{{version}}\/[\s\S]*?\)/g
        ,function (x){
            return x.substring(18,x.length-1)+'.md)';
        }
    )
    .replaceAll(/\[.*?\]\(.*?\)/g
        ,function (x){
            return '<a href="'+x.split(']')[1].split('(')[1].slice(0,-1)+'">'+x.split(']')[0].substring(1)+'</a>'
        }
    )
    .replaceAll(/> {tip}.*?\n/g
        ,function (x){
            return '<div class="tip">'+x.slice(7,-1)+'</div>'
        }
    )
    .replaceAll(/> {note}.*?\n/g
        ,function (x){
            return '<div class="note">'+x.slice(8,-1)+'</div>'
        }
    )
;
let isdark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if(isdark){
    document.getElementsByTagName("html")[0].setAttribute('data-mode','dark');
}
var scriptTag = document.createElement('script');
scriptTag.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js";
console.log("1");
scriptTag.onload = function () {
    let sc = document.createElement('script');
    sc.innerHTML = `hljs.highlightAll();`;
    document.querySelector("body").append(sc);
};
console.log("2");
document.querySelector("body").append(scriptTag);