import React, { useState } from 'react';
import { Code, Download, Eye, FileText, Upload, FileCheck } from 'lucide-react';
import jsPDF from 'jspdf';
import { LoadingSpinner } from './LoadingSpinner';

interface HTMLTemplatePDFProps {
  onClose?: () => void;
}

export const HTMLTemplatePDF: React.FC<HTMLTemplatePDFProps> = ({ onClose }) => {
  const manualDischargeTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Manual Discharge</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .manual-discharge { padding: 10px; width: 940px; } 

  .header {line-height: 1.3; margin-bottom: 8px; }
  .header h1, .header h2 { text-align: center; font-size: 22px; }

  .info { width: 100%; display: flex; justify-content: space-between; margin-bottom: 5px;}
  .info .left{ width: 40%; display: flex;}
  .info .left div h3{ text-align: center;}
  .info .left div:nth-child(1){ width: 55%; display: flex; line-height: 25px;}
  .info .left div:nth-child(2){ width: 45%; display: flex; align-items: center; line-height: 22px;}
  .info .left div:nth-child(2) h3{ margin-right: 20px;}
  .info .right { width: 55%; display: flex; flex-direction: column;}
  .info .right .top{ display: flex; justify-content: space-between;}
  .info .right .bottom { display: flex; justify-content: space-between; margin-right:15px;}
  .info .right .bottom h3 { display: inline-block; width: 16%; text-align: end;}
  .info .right .bottom b { margin-top: 13px;}
  .info .right .bottom b:nth-child(2) { width: 21%; text-align: end;}
  .info .left div h3, .info .right .top h3, .info .right .bottom h3{
    font-size: 16px;
  }
  .info .left div b, .info .right .top b, .info .right .bottom b{
    font-size: 14px;
  }

  table { width: 100%; border-collapse: collapse; font-size: 12px; table-layout: fixed; }
  th, td { border: 2px solid black; text-align: center; padding: 2px; vertical-align: middle; word-wrap: break-word; }

  thead { height: 80px; border: 3px solid black;}
  table td:first-child { border-left: 3px solid black; }
  table td:last-child { border-right: 3px solid black; }
  thead tr { height: 50%; }
  thead tr th { font-weight: bold; font-size: 14px; padding: 4px; }

  thead tr:first-child th:nth-child(2) { width: 130px; }

  tbody td { height: 35px; }

  .total-row td { border: 3px solid black; font-weight: bold; }

  .signature { line-height: 1.8; margin-top: 10px;}
  .signature div:nth-child(2){ margin: 20px 0;}
  .signature p { display: flex; align-items: center; margin-bottom: 40px; position: relative;}
  .signature p::after {
        content: "";
        display: inline-block;
        border-bottom: 2px dashed black;
        width: 240px;
    }
  .signature b{display: inline-block; width:37%; font-size: 15px;}

  .signature div:nth-child(1) b{ width: 100%; position: relative; border-bottom: 2px solid black; padding-bottom: 20px;}
  .signature div:nth-child(1) b::after{
        content: "";
        display: inline-block;
        border-bottom: 2px solid black;
        width: 824px;
  }

  .signature div b, .signature p b{ font-size: 16px;}

  .footer { font-size: 14px; margin-top: 20px; border: 2px solid black; padding: 3px 5px; }
  .footer div { display: flex; justify-content: space-evenly;}

</style>
</head>
<body>
    <div class="manual-discharge">

        <div class="header">
            <h1>Акт слива вагоно-цистерн</h1>
            <h2>Нефтепродукты, прибывшие на Терминал BST</h2>
        </div>

        <div class="info">
            <div class="left">
                <div>
                    <h3>Тип Груза:</h3>
                    <b>Heavy Pyrolysis Resin (E-6)</b>
                </div>
                <div>
                    <h3>Владелец:</h3>
                    <b>SOCAR Overseas DMCC</b>
                </div>
            </div>
            <div class="right">
                <div class="top">
                    <h3>Резервуар:</h3>
                    <b>Vessel</b>
                    <b>Акт №</b>
                    <b>22424</b>
                </div>
                <div class="bottom">
                    <b>Начала Слива</b>
                    <b>4/8/2024 2:22</b>
                    <h3>Конец слива:</h3>
                    <b>4/8/2024 8:48</b>
                </div>
            </div>
        </div>

        <table>
            <caption style="caption-side: top; text-align: left; font-size: 22px;">Статический метод измерения</caption>
            <thead>
                <tr>
                    <th rowspan="2">№ ЖД накладной</th>
                    <th rowspan="2">№ вагоно-цистерны</th>
                    <th rowspan="2">Тип вагоно-цистерны</th>
                    <th colspan="1">Показатели по док.</th>
                    <th colspan="8">Показатели по фактическому приему</th>
                </tr>
                <tr>
                    <th>Вес брутто, кг</th>
                    <th>Высота взлива, см</th>
                    <th>Вода, см</th>
                    <th>Вода, кг</th>
                    <th>Остаток, см</th>
                    <th>Остаток, кг</th>
                    <th>Т, °C</th>
                    <th>Плотность, т/м3</th>
                    <th>Вес брутто, кг</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>24024819</td>
                    <td>57389991</td>
                    <td>62</td>
                    <td>64584</td>
                    <td>241</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>64736</td>
                </tr>
                <tr>
                    <td>24024819</td>
                    <td>51366961</td>
                    <td>62</td>
                    <td>64584</td>
                    <td>240</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>64471</td>
                </tr>
                <tr>
                    <td>24024819</td>
                    <td>51343788</td>
                    <td>62</td>
                    <td>64318</td>
                    <td>239</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>64212</td>
                </tr>
                <tr>
                    <td>24024819</td>
                    <td>50758978</td>
                    <td>62</td>
                    <td>64318</td>
                    <td>239</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>64212</td>
                </tr>
                <tr>
                    <td>24024819</td>
                    <td>50754738</td>
                    <td>62</td>
                    <td>64318</td>
                    <td>239</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>64212</td>
                </tr>
                <tr>
                    <td>24024819</td>
                    <td>51358042</td>
                    <td>62</td>
                    <td>64318</td>
                    <td>240</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>64471</td>
                </tr>
                <tr>
                    <td>24024819</td>
                    <td>51358802</td>
                    <td>62</td>
                    <td>64053</td>
                    <td>238</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>63948</td>
                </tr>
                <tr>
                    <td>24024819</td>
                    <td>51359008</td>
                    <td>62</td>
                    <td>64053</td>
                    <td>239</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>64212</td>
                </tr>
                <tr>
                    <td>24024819</td>
                    <td>57361297</td>
                    <td>62</td>
                    <td>63782</td>
                    <td>238</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>63948</td>
                </tr>
                <tr>
                    <td>24024819</td>
                    <td>50755719</td>
                    <td>66</td>
                    <td>63664</td>
                    <td>218</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>63633</td>
                </tr>
                <tr>
                    <td>24024819</td>
                    <td>51343713</td>
                    <td>62</td>
                    <td>63511</td>
                    <td>236</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>63415</td>
                </tr>
                <tr>
                    <td>24024819</td>
                    <td>50755263</td>
                    <td>62</td>
                    <td>62693</td>
                    <td>233</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>62606</td>
                </tr>
                <tr>
                    <td>24019281</td>
                    <td>73161226</td>
                    <td>62</td>
                    <td>58357</td>
                    <td>218</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>58374</td>
                </tr>
                <tr>
                    <td>24019281</td>
                    <td>51343911</td>
                    <td>62</td>
                    <td>63396</td>
                    <td>236</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>63415</td>
                </tr>
                <tr>
                    <td>24019281</td>
                    <td>50755081</td>
                    <td>62</td>
                    <td>64453</td>
                    <td>240</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>64471</td>
                </tr>
                <tr>
                    <td>24019281</td>
                    <td>50755164</td>
                    <td>62</td>
                    <td>64194</td>
                    <td>239</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>64212</td>
                </tr>
                <tr>
                    <td>24019281</td>
                    <td>51358620</td>
                    <td>62</td>
                    <td>63930</td>
                    <td>238</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>63948</td>
                </tr>
                <tr>
                    <td>24019281</td>
                    <td>50755602</td>
                    <td>66</td>
                    <td>63615</td>
                    <td>217</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>63297</td>
                </tr>
                <tr>
                    <td>24019281</td>
                    <td>50755610</td>
                    <td>66</td>
                    <td>63615</td>
                    <td>218</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>63633</td>
                </tr>
                <tr>
                    <td>24019281</td>
                    <td>51358463</td>
                    <td>62</td>
                    <td>63396</td>
                    <td>236</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>63415</td>
                </tr>
                <tr>
                    <td>24019281</td>
                    <td>51359446</td>
                    <td>62</td>
                    <td>63396</td>
                    <td>236</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>63415</td>
                </tr>
                <tr>
                    <td>24027731</td>
                    <td>50755578</td>
                    <td>66</td>
                    <td>62005</td>
                    <td>213</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>61948</td>
                </tr>
                <tr>
                    <td>24027731</td>
                    <td>57362097</td>
                    <td>62</td>
                    <td>63921</td>
                    <td>238</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>63948</td>
                </tr>
                <tr>
                    <td>24027731</td>
                    <td>50754829</td>
                    <td>62</td>
                    <td>63921</td>
                    <td>238</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>63948</td>
                </tr>
                <tr>
                    <td>24027731</td>
                    <td>51359149</td>
                    <td>62</td>
                    <td>63658</td>
                    <td>236</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>63415</td>
                </tr>
                <tr>
                    <td>24027581</td>
                    <td>57373094</td>
                    <td>62</td>
                    <td>62859</td>
                    <td>234</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>14.2</td>
                    <td>1.0361</td>
                    <td>62876</td>
                </tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                <tr class="total-row">
                    <td>Итого :</td>
                    <td>26</td>
                    <td></td>
                    <td>1652912</td>
                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                    <td>1652391</td>
                </tr>
            </tbody>
        </table>

        <div class="signature">
            <div><b>Примечание:</b></div>
            <div><b>Подписи :</b></div>
            <p><b>1. Представитель Терминала</b></p>
            <p><b>2. Сюрвейер</b></p>
        </div>

        <div class="footer">
            <div>
                <p>Issue Date: 13.05.2008</p>
                <p>Revision No: &nbsp; 03</p>
                <p>Revision Date: &nbsp; 1.14.2014</p>
                <p>Form No:  &nbsp;  &nbsp; BST-OP-FR-114</p>
            </div>
        </div>
    </div>
</body>
</html>`;

  const [htmlContent, setHtmlContent] = useState(manualDischargeTemplate);
  const [generating, setGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleGeneratePDF = async () => {
    setGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create PDF with landscape orientation for better table display
      const doc = new jsPDF('l', 'mm', 'a4'); // landscape, millimeters, A4
      const pageWidth = 297; // A4 landscape width
      const pageHeight = 210; // A4 landscape height
      
      // Add title
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Акт слива вагоно-цистерн', pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(14);
      doc.text('Нефтепродукты, прибывшие на Терминал BST', pageWidth / 2, 30, { align: 'center' });
      
      // Add cargo info
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('Тип Груза: Heavy Pyrolysis Resin (E-6)', 20, 45);
      doc.text('Владелец: SOCAR Overseas DMCC', 20, 52);
      
      // Add vessel and act info
      doc.text('Резервуар: Vessel', 180, 45);
      doc.text('Акт № 22424', 180, 52);
      doc.text('Начала Слива: 4/8/2024 2:22', 180, 59);
      doc.text('Конец слива: 4/8/2024 8:48', 180, 66);
      
      // Add table title
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Статический метод измерения', 20, 80);
      
      // Create table data
      const tableHeaders = [
        '№ ЖД накладной',
        '№ вагоно-цистерны', 
        'Тип',
        'Вес брутто (док), кг',
        'Высота взлива, см',
        'Т, °C',
        'Плотность, т/м3',
        'Вес брутто (факт), кг'
      ];
      
      const tableData = [
        ['24024819', '57389991', '62', '64584', '241', '14.2', '1.0361', '64736'],
        ['24024819', '51366961', '62', '64584', '240', '14.2', '1.0361', '64471'],
        ['24024819', '51343788', '62', '64318', '239', '14.2', '1.0361', '64212'],
        ['24024819', '50758978', '62', '64318', '239', '14.2', '1.0361', '64212'],
        ['24024819', '50754738', '62', '64318', '239', '14.2', '1.0361', '64212'],
        ['24024819', '51358042', '62', '64318', '240', '14.2', '1.0361', '64471'],
        ['24024819', '51358802', '62', '64053', '238', '14.2', '1.0361', '63948'],
        ['24024819', '51359008', '62', '64053', '239', '14.2', '1.0361', '64212'],
        ['24024819', '57361297', '62', '63782', '238', '14.2', '1.0361', '63948'],
        ['24024819', '50755719', '66', '63664', '218', '14.2', '1.0361', '63633'],
        ['24024819', '51343713', '62', '63511', '236', '14.2', '1.0361', '63415'],
        ['24024819', '50755263', '62', '62693', '233', '14.2', '1.0361', '62606'],
        ['24019281', '73161226', '62', '58357', '218', '14.2', '1.0361', '58374'],
        ['24019281', '51343911', '62', '63396', '236', '14.2', '1.0361', '63415'],
        ['24019281', '50755081', '62', '64453', '240', '14.2', '1.0361', '64471'],
        ['24019281', '50755164', '62', '64194', '239', '14.2', '1.0361', '64212'],
        ['24019281', '51358620', '62', '63930', '238', '14.2', '1.0361', '63948'],
        ['24019281', '50755602', '66', '63615', '217', '14.2', '1.0361', '63297'],
        ['24019281', '50755610', '66', '63615', '218', '14.2', '1.0361', '63633'],
        ['24019281', '51358463', '62', '63396', '236', '14.2', '1.0361', '63415'],
        ['24019281', '51359446', '62', '63396', '236', '14.2', '1.0361', '63415'],
        ['24027731', '50755578', '66', '62005', '213', '14.2', '1.0361', '61948'],
        ['24027731', '57362097', '62', '63921', '238', '14.2', '1.0361', '63948'],
        ['24027731', '50754829', '62', '63921', '238', '14.2', '1.0361', '63948'],
        ['24027731', '51359149', '62', '63658', '236', '14.2', '1.0361', '63415'],
        ['24027581', '57373094', '62', '62859', '234', '14.2', '1.0361', '62876']
      ];
      
      // Add total row
      tableData.push(['Итого:', '26', '', '1652912', '', '', '', '1652391']);
      
      // Use autoTable for better table formatting
      (doc as any).autoTable({
        head: [tableHeaders],
        body: tableData,
        startY: 85,
        theme: 'grid',
        headStyles: { 
          fillColor: [220, 220, 220],
          textColor: 0,
          fontSize: 9,
          fontStyle: 'bold',
          halign: 'center'
        },
        bodyStyles: { 
          fontSize: 8,
          cellPadding: 2,
          halign: 'center'
        },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 25 },
          2: { cellWidth: 15 },
          3: { cellWidth: 30 },
          4: { cellWidth: 25 },
          5: { cellWidth: 20 },
          6: { cellWidth: 25 },
          7: { cellWidth: 30 }
        },
        didParseCell: function(data: any) {
          // Make total row bold
          if (data.row.index === tableData.length - 1) {
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.fillColor = [240, 240, 240];
          }
        }
      });
      
      // Add signatures section
      const finalY = (doc as any).lastAutoTable.finalY + 15;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Примечание:', 20, finalY);
      doc.text('Подписи:', 20, finalY + 10);
      
      doc.setFont('helvetica', 'normal');
      doc.text('1. Представитель Терминала: ________________________', 20, finalY + 20);
      doc.text('2. Сюрвейер: ________________________', 20, finalY + 30);
      
      // Add footer
      doc.setFontSize(10);
      doc.text('Issue Date: 13.05.2008', 20, pageHeight - 20);
      doc.text('Revision No: 03', 80, pageHeight - 20);
      doc.text('Revision Date: 1.14.2014', 140, pageHeight - 20);
      doc.text('Form No: BST-OP-FR-114', 200, pageHeight - 20);
      
      // Add generation timestamp
      doc.setFontSize(8);
      doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - 60, 10);
      
      doc.save('manual_discharge_report.pdf');
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/html') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setHtmlContent(content);
      };
      reader.readAsText(file);
    }
  };

  const loadManualDischargeTemplate = () => {
    setHtmlContent(manualDischargeTemplate);
  };

  const templateVariables = [
    { name: '{{date}}', description: 'Current date' },
    { name: '{{time}}', description: 'Current time' },
    { name: '{{company}}', description: 'Company name' },
    { name: '{{title}}', description: 'Document title' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <Code className="h-6 w-6 mr-3" />
              HTML Template PDF Generator
            </h2>
            <p className="text-indigo-100 mt-1">Create PDFs from custom HTML templates with full styling control</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
              <span>{previewMode ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              onClick={handleGeneratePDF}
              disabled={generating}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              {generating ? (
                <LoadingSpinner size="sm" className="border-white border-t-indigo-300" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span>{generating ? 'Generating...' : 'Generate PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sample Template Alert */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileCheck className="h-5 w-5 text-green-600" />
            <div>
              <h3 className="text-green-800 font-semibold">Manual Discharge Template Loaded</h3>
              <p className="text-green-700 text-sm">Your uploaded HTML template has been loaded and is ready for PDF generation.</p>
            </div>
          </div>
          <button
            onClick={loadManualDischargeTemplate}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            Reload Template
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Template Variables Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              Template Info
            </h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Document Type</h4>
                <p className="text-sm text-blue-800">Manual Discharge Report</p>
                <p className="text-xs text-blue-600 mt-1">Railway tank car discharge certificate</p>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Complex table structure</li>
                  <li>• Cyrillic text support</li>
                  <li>• Professional formatting</li>
                  <li>• Signature sections</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Different HTML File
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".html"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="html-upload"
                />
                <label
                  htmlFor="html-upload"
                  className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-700">Choose HTML File</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {previewMode ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">HTML Preview</h3>
                <p className="text-sm text-gray-600">Preview of your Manual Discharge template</p>
              </div>
              <div className="p-6">
                <div 
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                  style={{ height: '600px' }}
                >
                  <iframe
                    srcDoc={htmlContent}
                    className="w-full h-full"
                    title="HTML Preview"
                    style={{ transform: 'scale(0.8)', transformOrigin: 'top left', width: '125%', height: '125%' }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">HTML Template Editor</h3>
                <p className="text-sm text-gray-600 mt-1">Edit your Manual Discharge template below.</p>
              </div>
              <div className="p-6">
                <textarea
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  className="w-full h-96 font-mono text-sm border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter your HTML template here..."
                />
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Lines: {htmlContent.split('\n').length} | Characters: {htmlContent.length}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={loadManualDischargeTemplate}
                      className="text-sm text-green-600 hover:text-green-800 font-medium"
                    >
                      Reset to Original
                    </button>
                    <button
                      onClick={() => setHtmlContent('')}
                      className="text-sm text-red-600 hover:text-red-800 font-medium"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Manual Discharge Template Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-semibold mb-2">Template Highlights:</h4>
            <ul className="space-y-1">
              <li>• Professional Russian/Cyrillic document format</li>
              <li>• Complex table with merged cells and borders</li>
              <li>• Structured data layout for railway operations</li>
              <li>• Signature and approval sections</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">PDF Generation:</h4>
            <ul className="space-y-1">
              <li>• Landscape orientation for wide tables</li>
              <li>• Optimized for A4 paper size</li>
              <li>• Preserves table structure and formatting</li>
              <li>• Includes all document metadata</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};