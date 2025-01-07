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

import '../../components/UI/quill.snow.css';
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
    coverURL: '',
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

  // Add state for current logo URL
  const [currentLogoUrl, setCurrentLogoUrl] = useState('');
  const [currentCoverUrl, setCurrentCoverUrl] = useState('');

  const authContext = useContext(AuthContext);

  // Add these utility functions at the top of the component
  const imageValidations = {
    logo: {
      maxFileSize: 1024 * 1024, // 1MB
      validateDimensions: (width, height) => width === height,
      errorMessage: 'Please select a square image (width equals height)',
      successMessage: 'Logo updated successfully.',
      fieldName: 'logoImage',
    },
    hero: {
      maxFileSize: 1024 * 1024, // 1MB
      validateDimensions: (width, height) => width / height >= 2,
      errorMessage:
        'Please select a rectangular image where width is at least twice the height',
      successMessage: 'Hero image updated successfully.',
      fieldName: 'coverImage',
    },
  };

  const validateImageFile = (file, maxFileSize) => {
    if (!file) {
      throw new Error('Please select a file.');
    }
    if (file.size > maxFileSize) {
      throw new Error('File is too large. Please select a file less than 1MB.');
    }
    if (
      file.type !== 'image/png' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/jpeg'
    ) {
      throw new Error('Invalid file type. Please select a PNG or JPG image.');
    }
  };

  const handleImageChange = async (e, type, setPreview, setImage) => {
    const file = e.target.files[0];
    const validation = imageValidations[type];

    try {
      validateImageFile(file, validation.maxFileSize);

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (f) => {
          const image = new Image();
          image.onload = () => {
            if (validation.validateDimensions(image.width, image.height)) {
              setPreview(reader.result);
              setImage(file);
              resolve(true); // Validation passed
            } else {
              setErrorMessage(validation.errorMessage);
              setPreview(null);
              setImage(null);
              resolve(false); // Validation failed
            }
          };
          image.onerror = () => {
            console.error('Failed to load the image.');
            setPreview(null);
            setImage(null);
            reject(new Error('Failed to load the image.'));
          };
          image.src = f.target.result;
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      setErrorMessage(error.message);
      setPreview(null);
      setImage(null);
      return Promise.resolve(false); // Validation failed
    }
  };

  const handleImageUpload = async (e, type, setPreview, setImage) => {
    const validation = imageValidations[type];

    const validationPassed = await handleImageChange(
      e,
      type,
      setPreview,
      setImage
    );
    if (!validationPassed) return; // Don't proceed with upload if validation failed

    const file = e.target.files[0];
    if (!file) return;

    try {
      let updatedWallet = { ...wallet, [validation.fieldName]: file };
      await updateWallet(authContext.token, updatedWallet);
      setSuccessMessage(validation.successMessage);
    } catch (error) {
      console.error(error);
      if (error?.message?.includes('File too large')) {
        setErrorMessage(
          'The file is too large. Please select a smaller file (maximum 1MB).'
        );
      } else {
        setErrorMessage(`An error occurred while updating the ${type}.`);
      }
    }
  };

  // Replace the existing handlers with these simplified versions
  const handleLogoUpload = (e) =>
    handleImageUpload(e, 'logo', setLogoPreview, setLogo);
  const handleHeroImageUpload = (e) =>
    handleImageUpload(e, 'hero', setHeroImagePreview, setHeroImage);

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
        // Set the current logo URL if it exists
        if (returnedWalletData.logoURL) {
          setCurrentLogoUrl(returnedWalletData.logoURL);
        }
        // Set the current cover URL if it exists
        if (returnedWalletData.coverURL) {
          setCurrentCoverUrl(returnedWalletData.coverURL);
        }
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

  useEffect(() => {
    let timeoutId;
    if (errorMessage) {
      timeoutId = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [errorMessage]);

  useEffect(() => {
    let timeoutId;
    if (successMessage) {
      timeoutId = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [successMessage]);

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
            //height: '80vh',
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
            {(currentLogoUrl || logoPreview) && (
              <div style={{ marginBottom: '1rem' }}>
                <div
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '4px',
                    backgroundColor: '#f5f5f5',
                    width: 'fit-content',
                  }}
                >
                  <img
                    src={logoPreview || currentLogoUrl}
                    alt={logoPreview ? 'Logo Preview' : 'Current Logo'}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
                  accept=".png,.jpg,.jpeg"
                  onChange={handleLogoUpload}
                />
              </Button>
            </div>
          </div>

          {/* Upload Hero Image */}
          <div className="hero">
            <h5 style={{ marginBottom: '0.5rem' }}>
              Hero image (Recommended Resolution 840 X 360)
            </h5>
            {(currentCoverUrl || heroImagePreview) && (
              <div style={{ marginBottom: '1rem' }}>
                <div
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '4px',
                    backgroundColor: '#f5f5f5',
                    width: 'fit-content',
                  }}
                >
                  <img
                    src={heroImagePreview || currentCoverUrl}
                    alt={
                      heroImagePreview ? 'Hero Image Preview' : 'Current Cover'
                    }
                    style={{
                      height: '150px',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
                  accept=".png,.jpg,.jpeg"
                  onChange={handleHeroImageUpload}
                />
              </Button>
            </div>
          </div>
        </Paper>
      </ContentContainer>
    </StyledGrid>
  );
};

export default CustomizeWallet;
