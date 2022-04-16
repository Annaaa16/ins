import clsx from 'clsx';

import { useAutoFocus } from '~/hooks';

import IconEmoji from '~/components/Icon/IconEmoji';
import CreatorFormLocation from './CreatorFormLocation';
import CreatorFormSetting from './CreatorFormSetting';

import avatar from '~/assets/avatar.png';

interface CreatorFormProps {
  caption: string;
  onChangeCaption: (text: string) => void;
}

const CreatorForm = ({ caption, onChangeCaption }: CreatorFormProps) => {
  const { focusRef } = useAutoFocus();

  return (
    <div className='lg:w-2/5 border-l border-line'>
      <div className='px-3 py-4'>
        <div className='flex items-center'>
          <img className='w-7 h-7 rounded-full mr-2' src={avatar.src} alt='Avatar' />
          <span className='font-bold text-base'>minhhunghuynh1106</span>
        </div>
        <textarea
          ref={focusRef}
          value={caption}
          onChange={(e) => onChangeCaption(e.target.value)}
          className={clsx('w-full mt-3 resize-none text-sm', 'placeholder:text-base')}
          placeholder='Write a caption...'
          name=''
          id=''
          rows={10}
        ></textarea>
        <div className='flex-between'>
          <IconEmoji className={clsx('fill-base-gray', 'cursor-pointer')} />
          <span className={clsx('text-sm-1', 'text-base-gray')}>0/2,200</span>
        </div>
      </div>

      <CreatorFormLocation />
      <CreatorFormSetting />
    </div>
  );
};

export default CreatorForm;
