import React from 'react'
import { Route,Routes } from 'react-router-dom';
import HomePage from '../src/Pages/HomePage'
import ApplicationPage from '../src/Pages/ApplicationPage'
import ClientReg from '../src/Pages/ClientReg'
import NewRegistration from './Pages/NewRegistration';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import ApplicationFormPage from './Pages/ApplicationFormPage';
import AdditionalContactDetails from './Component/AdditionalContactDetails';
import PhotoSignatureUpload from './Component/PhotoSignatureUpload';
import ScrollToTop from './Component/ScrollToTop';

const App = () => {
  return (
    <>
    <main>
            <ScrollToTop/>
      <Navbar/>

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/apply' element={<ApplicationPage/>}/>
        <Route path='/client-registration' element={<ClientReg/>}/>
        <Route path='/new-registration' element={<NewRegistration/>}/>
        <Route path='/application-form' element={<ApplicationFormPage/>}/>
        <Route path='/application-form/additional-contact-details' element={<AdditionalContactDetails/>}/>
        <Route path='/application-form/photo-signature-upload' element={<PhotoSignatureUpload/>}/>





      </Routes>

      <Footer/>
    </main>


      
    </>
  )
}

export default App
