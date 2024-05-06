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
import { Paper, Button } from '@mui/material';

import 'react-quill/dist/quill.snow.css';
import Message, {
  MessageType,
} from '../../components/UI/components/Message/Message';

const CustomizeWallet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

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
        setAbout(returnedWalletData.about);
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
      let updated = await updateWallet(authContext.token, updatedWallet);
      if (updated) {
        setSuccessMessage('About wallet text updated successfully.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        'An error occurred while updating the about wallet text.'
      );
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
      <PageHeader title={'Customize Wallet'} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
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
      </div>
      <h3
        style={{ color: 'rgba(118, 187, 35, 1)', margin: '0 1rem 1rem 1rem' }}
      >
        {wallet.name}
      </h3>
      <ContentContainer>
        <Paper
          className="box"
          elevation={3}
          style={{
            width: '100%',
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '6rem',
            padding: '2rem',
          }}
        >
          <div className="about" style={{}}>
            <h5 style={{ marginBottom: '0.5rem' }}>About the Wallet</h5>
            <ReactQuill
              style={{ height: '5rem' }}
              value={about}
              onChange={handleAboutChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={false}
              onClick={saveAbout}
              style={{ marginTop: '3.5rem' }}
            >
              Save
            </Button>
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
            <input
              type="button"
              value="Upload Logo"
              onClick={handleLogoUpload}
            />
          </div>

          {/* Upload Hero Image */}
          <input
            type="file"
            accept=".jpeg,.png"
            onChange={handleHeroImageUpload}
          />
          {heroImage && <img src={heroImage} alt="Wallet Hero" />}
        </Paper>
      </ContentContainer>
    </StyledGrid>
  );
};

export default CustomizeWallet;
