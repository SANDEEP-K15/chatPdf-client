// 'use client';
// import * as React from 'react';
// import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const FileUploadComponent: React.FC = () => {
//   const [isUploading, setIsUploading] = React.useState<boolean>(false);
//   const [uploadStatus, setUploadStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
//   const fileInputRef = React.useRef<HTMLInputElement | null>(null);

//   const handleFileUploadButtonClick = () => {
//     if (isUploading) return;
    
//     const el = document.createElement('input');
//     el.setAttribute('type', 'file');
//     el.setAttribute('accept', 'application/pdf');
//     el.addEventListener('change', async () => {
//       if (el.files && el.files.length > 0) {
//         const file = el.files.item(0);
//         if (file) {
//           setIsUploading(true);
//           setUploadStatus('idle');
          
//           try {
//             const formData = new FormData();
//             formData.append('pdf', file);

//             const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
//             const response = await fetch(`${apiUrl}/upload/pdf`, {
//               method: 'POST',
//               body: formData,
//             });

//             if (!response.ok) {
//               throw new Error(`Upload failed: ${response.status}`);
//             }

//             setUploadStatus('success');
//             console.log('File uploaded successfully');
            
//             // Reset status after 3 seconds
//             setTimeout(() => {
//               setUploadStatus('idle');
//             }, 3000);
//           } catch (error) {
//             console.error('Error uploading file:', error);
//             setUploadStatus('error');
            
//             // Reset error status after 3 seconds
//             setTimeout(() => {
//               setUploadStatus('idle');
//             }, 3000);
//           } finally {
//             setIsUploading(false);
//           }
//         }
//       }
//     });
//     el.click();
//   };

//   return (
//     <div className="w-full max-w-md">
//       <div className="bg-gradient-to-br from-card to-card/50 border border-border rounded-2xl shadow-xl p-8 backdrop-blur-sm">
//         <div className="flex flex-col items-center justify-center space-y-4">
//           <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl mb-2">
//             <Upload className={`w-12 h-12 text-blue-600 dark:text-blue-400 transition-all ${
//               isUploading ? 'animate-pulse' : ''
//             }`} />
//           </div>
          
//           <div className="text-center space-y-2">
//             <h3 className="text-xl font-semibold">Upload PDF File</h3>
//             <p className="text-sm text-muted-foreground">
//               Select a PDF document to start chatting
//             </p>
//           </div>

//           <Button
//             onClick={handleFileUploadButtonClick}
//             disabled={isUploading}
//             size="lg"
//             className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isUploading ? (
//               <>
//                 <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                 Uploading...
//               </>
//             ) : uploadStatus === 'success' ? (
//               <>
//                 <CheckCircle2 className="w-5 h-5 mr-2" />
//                 Upload Successful!
//               </>
//             ) : uploadStatus === 'error' ? (
//               <>
//                 <AlertCircle className="w-5 h-5 mr-2" />
//                 Upload Failed
//               </>
//             ) : (
//               <>
//                 <Upload className="w-5 h-5 mr-2" />
//                 Choose PDF File
//               </>
//             )}
//           </Button>

//           {isUploading && (
//             <p className="text-xs text-muted-foreground mt-2 text-center">
//               Please wait while we process your document...
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileUploadComponent;

'use client';
import * as React from 'react';
import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FileUploadComponent: React.FC = () => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadStatus, setUploadStatus] =
    React.useState<'idle' | 'success' | 'error'>('idle');

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

      const response = await fetch(`${apiUrl}/upload/pdf`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      setUploadStatus('success');
      setTimeout(() => setUploadStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    } finally {
      setIsUploading(false);
      e.target.value = ''; // reset input
    }
  };

  return (
    <div className="w-full max-w-md">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        hidden
        onChange={handleFileChange}
      />

      <Button
        onClick={handleButtonClick}
        disabled={isUploading}
        size="lg"
        className="w-full"
      >
        {isUploading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Uploading...
          </>
        ) : uploadStatus === 'success' ? (
          <>
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Upload Successful!
          </>
        ) : uploadStatus === 'error' ? (
          <>
            <AlertCircle className="w-5 h-5 mr-2" />
            Upload Failed
          </>
        ) : (
          <>
            <Upload className="w-5 h-5 mr-2" />
            Choose PDF File
          </>
        )}
      </Button>
    </div>
  );
};

export default FileUploadComponent;
