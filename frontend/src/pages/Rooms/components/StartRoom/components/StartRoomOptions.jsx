import DummyImage from '@/components/DummyImage';
import { components } from 'react-select';
import { OptionOuterStyled } from '../StartRoom.styled';

const Option = (props) => {
  return (
    <components.Option {...props}>
      <OptionOuterStyled>
        {props?.data?.avatar ? (
          <img
            src={props.data.avatar}
            alt=''
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
            referrerPolicy='no-referrer'
          />
        ) : (
          <DummyImage
            height={30}
            width={30}
            userName={props?.data?.label?.charAt(0)}
          />
        )}
        <span>
          <span>{props.data.label}</span>
          <p style={{ fontSize: '12px', color: 'gray' }}>
            @{props.data.userName}
          </p>
        </span>
      </OptionOuterStyled>
    </components.Option>
  );
};

const NoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      <div style={{ color: '#808080', textAlign: 'center' }}>
        {props?.selectProps?.inputValue
          ? 'No user found'
          : 'Search users with Fullname or Username'}
      </div>
    </components.NoOptionsMessage>
  );
};

export { Option, NoOptionsMessage };
