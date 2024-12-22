import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const CVEditor = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        education: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPdfFile(file);
            setPreviewUrl(url);
        }
    };

    const generatePDF = async () => {
        try {
            // Tạo PDF mới hoặc load template nếu có
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([595.28, 841.89]); // A4 size

            // Thêm nội dung
            page.drawText('CURRICULUM VITAE', {
                x: 50,
                y: 800,
                size: 24,
                color: rgb(0, 0, 0),
            });

            page.drawText(`Name: ${formData.fullName}`, {
                x: 50,
                y: 750,
                size: 12,
            });

            page.drawText(`Email: ${formData.email}`, {
                x: 50,
                y: 730,
                size: 12,
            });

            page.drawText(`Phone: ${formData.phone}`, {
                x: 50,
                y: 710,
                size: 12,
            });

            page.drawText('Experience:', {
                x: 50,
                y: 670,
                size: 14,
            });

            // Wrap text for experience
            const experienceLines = formData.experience.split('\n');
            let yPosition = 650;
            experienceLines.forEach(line => {
                page.drawText(line, {
                    x: 50,
                    y: yPosition,
                    size: 12,
                });
                yPosition -= 20;
            });

            // Save và download
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'my-cv.pdf';
            link.click();
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">CV Editor</h2>

                {/* Form inputs */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Experience</label>
                        <textarea
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                {/* Action buttons */}
                <div className="mt-6 space-x-4">
                    <button
                        onClick={generatePDF}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Generate PDF
                    </button>
                </div>
            </div>

            {/* PDF Preview */}
            {previewUrl && (
                <div className="mt-8">
                    <h3 className="text-lg font-medium mb-2">Preview</h3>
                    <iframe
                        src={previewUrl}
                        className="w-full h-96 border rounded"
                        title="PDF Preview"
                    />
                </div>
            )}
        </div>
    );
};

export default CVEditor;