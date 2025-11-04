import React, { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import { FormData, FormErrors } from './types';
import { CLASSES, GENDERS, COURSE_OPTIONS_MAP } from './constants';
import Input from './components/Input';
import Select from './components/Select';
import Textarea from './components/Textarea';
import RadioGroup from './components/RadioGroup';
import FileInput from './components/FileInput';

// Let TypeScript know that the XLSX library is available globally
declare var XLSX: any;

const initialFormData: FormData = {
  fullName: '',
  fatherName: '',
  dob: '',
  gender: '',
  address: '',
  school: '',
  class: '',
  course: '',
  contactNumber: '',
  email: '',
  studentPhoto: null,
  lastQualification: '',
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [courseOptions, setCourseOptions] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const selectedClass = formData.class;
    if (selectedClass && COURSE_OPTIONS_MAP[selectedClass]) {
      setCourseOptions(COURSE_OPTIONS_MAP[selectedClass]);
    } else {
      setCourseOptions([]);
    }
    setFormData(prev => ({ ...prev, course: '' }));
  }, [formData.class]);
  
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({...prev, studentPhoto: "File size must be less than 5MB"}));
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({...prev, studentPhoto: "Please upload a valid image file."}));
        return;
      }
      
      setFormData(prev => ({ ...prev, studentPhoto: file }));
      setPhotoPreview(URL.createObjectURL(file));
      setErrors(prev => ({...prev, studentPhoto: undefined}));
    }
  }, []);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.fatherName.trim()) newErrors.fatherName = 'Father\'s Name is required.';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required.';
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    if (!formData.class) newErrors.class = 'Class is required.';
    if (!formData.course) newErrors.course = 'Course is required.';
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact Number is required.';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact Number must be 10 digits.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    return newErrors;
  }

  const exportToExcel = () => {
    const submissionDate = new Date().toLocaleDateString();
    const dataToExport = [{
      'Submission Date': submissionDate,
      'Full Name': formData.fullName,
      'Father\'s Name': formData.fatherName,
      'Date of Birth': formData.dob,
      'Gender': formData.gender,
      'Address': formData.address,
      'School/College Name': formData.school,
      'Class': formData.class,
      'Course': formData.course,
      'Contact Number': formData.contactNumber,
      'Email ID': formData.email,
      'Student Photo': formData.studentPhoto ? formData.studentPhoto.name : 'Not Uploaded',
      'Last Qualification / Result': formData.lastQualification,
    }];

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

    // Create a filename and trigger the download
    const fileName = `PARAKRAM_Registration_${formData.fullName.replace(/\s+/g, '_')}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    console.log('Form Submitted:', formData);
    exportToExcel();
    setIsSubmitted(true);
  };
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg text-center">
            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="mt-4 text-3xl font-bold text-gray-800">Registration Successful!</h1>
            <p className="mt-2 text-gray-600">
                Thank you for registering with PARAKRAM Coaching!
            </p>
            <p className="mt-1 text-gray-600">Your registration details have been downloaded. Our team will contact you soon for further details and guidance.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white p-6 md:p-10 rounded-xl shadow-lg">
        <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">PARAKRAM Coaching</h1>
            <h2 className="text-2xl font-semibold text-indigo-600">Student Registration Form</h2>
            <p className="mt-2 text-sm text-gray-600">
                Welcome to PARAKRAM Coaching! Please fill out the registration form carefully. Fields marked with <span className="text-red-500">*</span> are mandatory.
            </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required error={errors.fullName} />
                <Input label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} required error={errors.fatherName} />
                <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required error={errors.dob} />
                <RadioGroup label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={GENDERS} required error={errors.gender} />
            </div>

            <Textarea label="Address" name="address" value={formData.address} onChange={handleChange} />
            <Input label="Current School/College Name" name="school" value={formData.school} onChange={handleChange} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Select label="Class" name="class" value={formData.class} onChange={handleChange} options={CLASSES} required error={errors.class} placeholder="Select your class"/>
                 <Select label="Course" name="course" value={formData.course} onChange={handleChange} options={courseOptions} required error={errors.course} placeholder="Select a course" disabled={!formData.class}/>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Contact Number" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleChange} required error={errors.contactNumber} placeholder="10-digit mobile number"/>
                <Input label="Email ID" name="email" type="email" value={formData.email} onChange={handleChange} required error={errors.email} placeholder="you@example.com"/>
            </div>

            <FileInput label="Upload Student Photo" name="studentPhoto" onChange={handleFileChange} accept="image/*" previewUrl={photoPreview} error={errors.studentPhoto} />

            <Input label="Last Qualification / Result" name="lastQualification" value={formData.lastQualification} onChange={handleChange} placeholder="e.g., Class 7th - 85%"/>

            <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                    Register Now
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default App;