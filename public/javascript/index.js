import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Saludo } from './Saludo';

const componente= document.getElementById('raiz')
ReactDom.render(<Saludo/>, componente)
