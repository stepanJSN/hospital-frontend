import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import AdaptiveButton from '../Buttons/AdaptiveButton';

type ExportExcelProps = {
  data: object[];
  fileName: string;
};

const ExportExcel = ({ data, fileName }: ExportExcelProps) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <AdaptiveButton color="success" variant="contained" onClick={exportToExcel}>
      Export to Excel
    </AdaptiveButton>
  );
};

export default ExportExcel;
