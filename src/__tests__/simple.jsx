import React, {Component} from 'react'
import {Emitter, Receiver} from '../index'

export default () => (
  <Container>
    <Box>
      <Emitter>
        <Block />
      </Emitter>
      <Emitter>
        <Block />
        <Block />
      </Emitter>
    </Box>
    <Box>
      <Receiver />
    </Box>
    <Box>
      <Receiver />
    </Box>
  </Container>
)

const Container = ({children}) => (
  <div style={{display: 'flex', width: '100%'}}>
    {children}
  </div>
)

const Box = ({children}) => (
  <div style={{flex: 1, margin: 10, backgroundColor: 'yellow'}}>
    {children}
  </div>
)

const Block = () => (
  <div className={'block'} style={{height: 20, width: 20, backgroundColor: 'blue'}}></div>
)
