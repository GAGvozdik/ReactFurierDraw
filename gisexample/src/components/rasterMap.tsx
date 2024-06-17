

// Импортируем содержимое index.html как строку
// import indexHtml from './test.html';


import React, { Component } from "react";

// var perf =require('../../src/components/test.html');


interface IndexPageProps {
  // Убираем title из props, т.к. он больше не используется
}

const IndexPage: React.FC<IndexPageProps> = () => {


    return(
        <>
        {/* <iframe src={perf}></iframe>  */}
        </>
    )
}
export default IndexPage;



