import Layout from '../../total/Layout'
import { generate } from './wordGenerator'
import dataJSON from '../../../data/exportData.json'
import { IData } from './wordGenerator/document'

const Try = () => {
    // @ts-ignore
    const data: IData = dataJSON
    console.log('data', data)

    return (
        <Layout>
            <h3>This is my try</h3>
            <p>
                <button className="btn btn-primary" onClick={() => generate(data)}>Generate test file with docx!</button>
            </p>
        </Layout>
    )
}

export default Try
