import { UploadApiOptions } from 'cloudinary';

import { CLOUDINARY_FOLDERS } from '~/constants';
import cloudinary from '~/configs/cloudinary';

export const getPhotoIdFromUrl = (url: string) => {
  const prefix = CLOUDINARY_FOLDERS.POSTS;
  const regex = new RegExp(prefix + '/(?:vd+/)?([^.]+)');

  return url.match(regex)?.[0];
};

export const uploadPhoto = async (photo: string) => {
  const { secure_url } = await cloudinary.uploader.upload(photo, {
    folder: CLOUDINARY_FOLDERS.POSTS,
  });

  return { photo: secure_url };
};

export const updatePhoto = async (photo: string, photoUrl?: string) => {
  const options: UploadApiOptions = {};

  // Update
  if (photo && photoUrl) {
    const photoId = getPhotoIdFromUrl(photoUrl);

    options.public_id = photoId;
    options.overwrite = true;
    options.invalidate = true;
  }

  // Add new one
  if (photo && !photoUrl) options.folder = CLOUDINARY_FOLDERS.POSTS;

  const { secure_url } = await cloudinary.uploader.upload(photo, options);

  return { photoUrl: secure_url };
};

export const deletePhoto = async (photoUrl?: string) => {
  if (!photoUrl) return;

  const photoId = getPhotoIdFromUrl(photoUrl);

  if (!photoId) return;

  await cloudinary.uploader.destroy(photoId);
};
