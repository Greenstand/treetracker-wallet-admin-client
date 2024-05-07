import React, { useContext, useEffect, useState } from 'react';
import {
  ContentContainer,
  StyledGrid,
  VisuallyHiddenInput,
} from './CustomizeWalletStyled';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import AuthContext from '../../store/auth-context';
import { Loader } from '../../components/UI/components/Loader/Loader';
import { getWalletById, updateWallet } from '../../api/wallets';
import ReactQuill from 'react-quill';
import { Paper, Button, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
  const [aboutError, setAboutError] = useState(false);

  const [displayName, setDisplayName] = useState('');
  const [displayNameError, setDisplayNameError] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [heroImage, setHeroImage] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState(null);

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
        setDisplayName(returnedWalletData.displayName);
      } catch (error) {
        console.error(error);
        setErrorMessage('An error occurred while fetching the data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [authContext.token]);

  const handleAboutChange = (value) => {
    setAbout(value);

    const textOnly = value.replace(/<[^>]*>/g, ''); // Regex to remove HTML tags
    if (textOnly.trim().length < 5) {
      setAboutError('About text must be at least 5 characters long.');
    } else {
      setAboutError('');
    }
  };

  const handleDisplayNameChange = (event) => {
    const value = event.target.value;
    setDisplayName(value);

    if (value.trim().length < 2) {
      setDisplayNameError('Display name must be at least 2 characters long.');
    } else {
      setDisplayNameError('');
    }
  };

  const saveWalletField = async (field, value, successMessage) => {
    try {
      let updatedWallet = { ...wallet, [field]: value };
      let updated = await updateWallet(authContext.token, updatedWallet);
      if (updated) {
        setSuccessMessage(successMessage);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(`An error occurred while updating the ${field} field.`);
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
        const image = new Image();
        image.onload = () => {
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
    handleLogoChange(e);

    // TOOD: Uncomment when API is ready
    // const file = e.target.files[0];
    // // Validate file size and dimensions...
    // try {
    //   let updatedWallet = { ...wallet, logoImage: file };
    //   await updateWallet(authContext.token, updatedWallet);
    // } catch (error) {
    //   console.error(error);
    //   setErrorMessage('An error occurred while updating the wallet.');
    // }
  };

  const handleHeroImageChange = async (e) => {
    const maxFileSize = 1024 * 1024 * 3; // Maximum file size of 3MB
    const requiredDimensionWidth = 1680;
    const requiredDimensionHeight = 660;

    const file = e.target.files[0];

    if (!file) {
      alert('Please select a file.');
      return;
    }
    if (file.size > maxFileSize) {
      alert('File is too large. Please select a file less than 3MB.');
      return;
    }
    if (file.type !== 'image/png') {
      alert('Invalid file type. Please select a PNG image.');
      return;
    }

    setHeroImage(file);

    if (file && file.type === 'image/png') {
      const reader = new FileReader();

      reader.onload = (f) => {
        const image = new Image();
        image.onload = () => {
          // Check if the image is exactly 1680px by 660px
          if (
            image.width === requiredDimensionWidth &&
            image.height === requiredDimensionHeight
          ) {
            setHeroImagePreview(reader.result);
          } else {
            alert(
              `Please select an image exactly ${requiredDimensionWidth}px by ${requiredDimensionHeight}px.`
            );
          }
        };
        image.src = f.target.result;
      };

      reader.readAsDataURL(file);
    } else {
      // Handle errors or unsupported file types
      setHeroImagePreview('');
    }
  };

  const handleHeroImageUpload = async (e) => {
    handleHeroImageChange(e);
    // TOOD: Uncomment when API is ready
    // const file = e.target.files[0];
    // // Validate file size and dimensions...
    // try {
    //   let updatedWallet = { ...wallet, coverImage: file };
    //   await updateWallet(authContext.token, updatedWallet);
    // } catch (error) {
    //   console.error(error);
    //   setErrorMessage('An error occurred while updating the wallet.');
    // }
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
            gap: '1.5rem',
            padding: '2rem',
          }}
        >
          <div
            className="about"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <h5 style={{ marginBottom: '0.5rem' }}>Display Name</h5>
            <TextField
              id="outlined-basic"
              value={displayName}
              onChange={handleDisplayNameChange}
              style={{ width: '30rem' }}
            />
            {displayNameError && (
              <p style={{ color: 'red' }}>{displayNameError}</p>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={displayNameError}
              onClick={() =>
                saveWalletField(
                  'displayName',
                  displayName,
                  'Display name updated successfully.'
                )
              }
              style={{ marginTop: '0.5rem', width: '5rem' }}
            >
              Save
            </Button>
          </div>

          <div
            className="about"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <h5 style={{ marginBottom: '0.5rem' }}>About the Wallet</h5>
            <ReactQuill
              style={{ height: '12rem', paddingBottom: '2.5rem' }}
              value={about}
              onChange={handleAboutChange}
            />
            {aboutError && <p style={{ color: 'red' }}>{aboutError}</p>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={aboutError}
              onClick={() =>
                saveWalletField(
                  'about',
                  about,
                  'About wallet text updated successfully.'
                )
              }
              style={{ marginTop: '0.5rem', width: '5rem' }}
            >
              Save
            </Button>
          </div>

          <div className="logo">
            <h5 style={{ marginBottom: '0.5rem' }}>Logo</h5>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload
              <VisuallyHiddenInput
                type="file"
                accept=".png"
                onChange={handleLogoUpload}
              />
            </Button>
            {logoPreview && (
              <div>
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  style={{
                    maxWidth: '100px',
                    maxHeight: '100px',
                    margin: '1rem 0',
                  }}
                />
              </div>
            )}
          </div>

          {/* Upload Hero Image */}
          <div className="hero">
            <h5 style={{ marginBottom: '0.5rem' }}>Hero image</h5>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload
              <VisuallyHiddenInput
                type="file"
                accept=".png"
                onChange={handleHeroImageUpload}
              />
            </Button>
            {heroImagePreview && (
              <div>
                <img
                  src={heroImagePreview}
                  alt="Hero Image Preview"
                  style={{
                    maxHeight: '100px',
                    margin: '1rem 0',
                  }}
                />
              </div>
            )}
          </div>
        </Paper>
      </ContentContainer>
    </StyledGrid>
  );
};

export default CustomizeWallet;
