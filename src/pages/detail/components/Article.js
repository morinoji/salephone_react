
import React, { useEffect } from 'react';
import { Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './css/article.css'
import { useSelector } from 'react-redux';

const Article = props => {
    let isExpand=false;
    const detail=useSelector(state=>state.detail.detail)
    useEffect(()=>{
        document.getElementById("article").innerHTML=detail.product_content
    })
    function expandNavigate(e){
        if(isExpand){
            document.getElementById("article").style.maxHeight="600px"
            document.getElementById("article").style.transition="max-height 200ms ease-in"
            document.getElementById("ghost").style.marginTop="-50px"
            document.getElementById("collapse-article").hidden=true
            document.getElementById("expand-article").hidden=false
        }else{
            document.getElementById("article").style.maxHeight=document.getElementById("article").scrollHeight+"px"
            document.getElementById("article").style.transition="max-height 200ms ease-in"
            document.getElementById("ghost").style.marginTop="0px"
            document.getElementById("collapse-article").hidden=false
            document.getElementById("expand-article").hidden=true
        }
        isExpand=!isExpand;
    }
    // const editorRef = useRef(null);
    return (
        <div className='article-section'>
            <div id='article' className='article-main' >
         {/* <Editor
         apiKey='wrcwklfk8zok3fg2ag4t3rbdh8e7voohlnohw20p9pfoeicb'
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue="<p>This is the initial content of the editor.</p>"
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent media | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
          <Button onClick={()=>console.log(editorRef.current.getContent())}>asdasdsa</Button>  */}
        
        </div>
        <div id="ghost" className='ghost'>
        <Button id="expand-article" className='genInfo-colors-item' onClick={expandNavigate}><DownOutlined /> Mở Rộng <DownOutlined /></Button>
             <Button id="collapse-article" hidden className='genInfo-colors-item' onClick={expandNavigate}><UpOutlined /> Thu Gọn <UpOutlined /></Button>
        </div>
            
        </div>
    );
};


export default Article;