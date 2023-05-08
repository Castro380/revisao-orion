
import { Card, Col, Row, Table } from 'react-bootstrap'
import Pagina from '@/componentes/Pagina'
import apiDeputados from '@/services/apiDeputados'
import Link from 'next/link'


const Detalhes = ({ deputado, deputado_despesas, deputado_profissoes }) => {
  return (
    <Pagina titulo={deputado.nomeCivil}>
        <Row md={3}>

          <Col>
                 <Card>
              <Card.Img src={deputado.ultimoStatus.urlFoto} />
              <Card.Body>
                <Card.Title>{deputado.ultimoStatus.nomeCivil}</Card.Title>
                  <p>Partido: {deputado.ultimoStatus.siglaPartido}</p>
                  <p>UF: {deputado.ultimoStatus.siglaUf}</p> 
              </Card.Body>

             
            </Card>
            <Col>
                  <Link className='btn btn-danger mt-3' href={'/deputados/'}>Voltar</Link>
            </Col>
          </Col>


    <Col>
      <Table striped>
      <thead>
        <tr>
          <th>Data</th>
          <th>Descrição</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
      {deputado_despesas.map(item => (
         <tr>
         <td>{item.dataDocumento}</td>
         <td>{item.tipoDespesa}</td>
         <td> R${item.valorDocumento}</td>
       </tr>
        ))}
      </tbody>
    </Table>
    </Col>

    <Col md={2}>

<h2>Profissões</h2>        

<ul>
    {deputado_profissoes.map(item => (
      <li>{item.titulo}</li>
    ))}
</ul>

</Col>

    </Row>
    </Pagina>
  )
}

export default Detalhes


export async function getServerSideProps(context) {

  const id = context.params.id

  const resultado = await apiDeputados.get("/deputados/" + id)
  const deputado = resultado.data.dados

  const despesas = await apiDeputados.get("/deputados/" + id + "/despesas")
  const deputado_despesas = despesas.data.dados

  const profissoes = await apiDeputados.get("/deputados/" + id + "/profissoes")
  const deputado_profissoes = profissoes.data.dados

  return {
    props: {
      deputado,
      deputado_despesas,
      deputado_profissoes
    
    }, // will be passed to the page component as props
  }
}