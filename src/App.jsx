import React from 'react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import expressionParser from 'docxtemplater/expressions';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

export const App = class App extends React.Component {
  render() {
    const generateDocument = () => {
      loadFile(
        '../public/template.doc',
        function (error, content) {
          if (error) {
            throw error;
          }
          const zip = new PizZip(content);
          const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            parser: expressionParser,
          });
          doc.render({
            first_name: 'щщщщщ',
            last_name: 'аывывавыаыв',
            organization: {
              companyName: 'шШШШШШШ',
            },
            phone: '0652455478',
            description: 'New Website',
          });
          const out = doc.getZip().generate({
            type: 'blob',
            mimeType:
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          }); //Output the document using Data-URI
          saveAs(out, 'putput.docx');
        }
      );
    };

    return (
      <div className="p-2">
        <h1>Test docxtemplater</h1>
        <button onClick={generateDocument}>Generate document</button>
        <p>Click the button above to generate a document using ReactJS</p>
        <p>
          You can edit the data in your code in this example. In your app, the
          data would comgfddatabase for example.
        </p>
      </div>
    );
  }
};

export default App;
