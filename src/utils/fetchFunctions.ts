import supabase from './supabaseClient';

const getPhotos = async (setPhoto) => {
    const { data, error } = await supabase
      .from('photos')
      .select('photo_name, photo_address')
      .order('photo_name', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error fetching photos:', error);
      return;
    }

    setPhoto(data?.[0] || null);
  };

const getPhotosFromBucket = (setBucketPhoto) => {
    const pathToImage = 'profile/photo-typing.jpeg';
    const { data } = supabase.storage.from("photo-bucket").getPublicUrl(pathToImage);

    if (data?.publicUrl) {
      setBucketPhoto({
        photo_name: 'about-photo',
        photo_address: data.publicUrl,
      });
    }
  };

export default {
    getPhotos,
    getPhotosFromBucket,
}