/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import {
  ContentContainer,
  // LoaderContainer,
  StyledGrid,
} from './CustomizeWalletStyled';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import AuthContext from '../../store/auth-context';
import { Loader } from '../../components/UI/components/Loader/Loader';
import { getWalletById, updateWallet } from '../../api/wallets';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

const CustomizeWallet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const defaultWallet = {
    id: '',
    logoURL: '',
    tokensInWallet: 0,
    name: '',
    about: '',
  };

  const [wallet, setWallet] = useState(defaultWallet);
  const [about, setAbout] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [heroImage, setHeroImage] = useState(null);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);

    // LocalStorage should have some wallet info after the login
    const wallet = JSON.parse(localStorage.getItem('wallet') || '{}');
    if (!wallet || !wallet.id) {
      console.log('Wallet info not found in the localStorage');
      authContext.logout();
      return;
    }

    const fetchData = async () => {
      try {
        const returnedWalletData = await getWalletById(
          authContext.token,
          wallet.id
        );
        setWallet(returnedWalletData);
        setAbout(returnedWalletData.description);
      } catch (error) {
        console.error(error);
        setErrorMessage('An error occurred while fetching the data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [authContext.token]);

  const handleAboutChange = (content) => {
    setAbout(content);
  };

  const saveAbout = async () => {
    try {
      let updatedWallet = { ...wallet, about };
      await updateWallet(authContext.token, updatedWallet);
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while updating the wallet.');
    }
  };

  const handleLogoChange = async (e) => {
    const maxFileSize = 1024 * 1024; // Maximum file size of 1MB
    const requiredDimension = 300; // Required dimensions (300px by 300px)

    const file = e.target.files[0];

    if (!file) {
      alert('Please select a file.');
      return;
    }
    if (file.size > maxFileSize) {
      alert('File is too large. Please select a file less than 1MB.');
      return;
    }
    if (file.type !== 'image/png') {
      alert('Invalid file type. Please select a PNG image.');
      return;
    }

    setLogo(file);

    if (file && file.type === 'image/png') {
      const reader = new FileReader();

      reader.onload = (f) => {
        debugger;
        const image = new Image();
        image.onload = () => {
          debugger;
          // Check if the image is exactly 300px by 300px
          if (
            image.width === requiredDimension &&
            image.height === requiredDimension
          ) {
            setLogoPreview(reader.result);
          } else {
            alert(
              `Please select an image exactly ${requiredDimension}px by ${requiredDimension}px.`
            );
          }
        };
        // image.onerror = (e) => {
        //   debugger;
        //   console.error('Failed to load the image.');
        // };
        image.src = f.target.result;
      };

      reader.readAsDataURL(file);
    } else {
      // Handle errors or unsupported file types
      setLogoPreview('');
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    // Validate file size and dimensions...
    try {
      let updatedWallet = { ...wallet, logoImage: file };
      await updateWallet(authContext.token, updatedWallet);
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while updating the wallet.');
    }
  };

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files[0];
    // Validate file size and dimensions...
    try {
      let updatedWallet = { ...wallet, coverImage: file };
      await updateWallet(authContext.token, updatedWallet);
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while updating the wallet.');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <StyledGrid>
      <PageHeader title={wallet.name} />
      {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
        {errorMessage && (
          <Message
            message={errorMessage}
            onClose={() => setErrorMessage('')}
            messageType={MessageType.Error}
          />
        )}
        {successMessage && (
          <Message
            message={successMessage}
            onClose={() => setSuccessMessage('')}
            messageType={MessageType.Success}
          />
        )}
      </div> */}
      <ContentContainer>
        <div className="about">
          <ReactQuill value={about} onChange={handleAboutChange} />
          <button onClick={saveAbout}>Save</button>
        </div>

        <div className="logo">
          <input type="file" accept=".png" onChange={handleLogoChange} />
          {logoPreview && (
            <div>
              <img
                src={logoPreview}
                alt="Logo Preview"
                style={{ maxWidth: '300px', maxHeight: '300px' }}
              />
            </div>
          )}
          <input type="button" value="Upload Logo" onClick={handleLogoUpload} />
        </div>

        {/* Upload Hero Image */}
        <input
          type="file"
          accept=".jpeg,.png"
          onChange={handleHeroImageUpload}
        />
        {heroImage && <img src={heroImage} alt="Wallet Hero" />}
      </ContentContainer>
    </StyledGrid>
  );
};

export default CustomizeWallet;
