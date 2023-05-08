import Pagina from '@/componentes/Pagina'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import apiDeputados from '@/services/apiDeputados'

const index = ({deputados}) => {
    

    return (
        <Pagina titulo='Deputados'>
            <h2>Deputados</h2>
            <Row>
                {deputados.map(item => (
                    <Col className='mb-3' md={2} title={item.foto}>
                        <Link href={'/deputados/' + item.id}>
                            <img key={item.id} src={item.urlFoto} width="200px" />
                        </Link>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}

export default index

export async function getServerSideProps(context) {
    const resultado = await apiDeputados.get("/deputados")
    const deputados = resultado.data.dados
  
    return {
      props: {
        deputados
      }, // will be passed to the page component as props
    }
  }