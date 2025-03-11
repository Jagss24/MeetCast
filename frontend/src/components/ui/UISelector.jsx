import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import React, { Fragment } from 'react';

const UISelector = ({
  label,
  value,
  onChange,
  options = [],
  containerClass = '',
  className = '',
  accessorKey = 'name',
  placeholder = '',
  disabled = false,
  emptyText = 'No data available',
}) => {
  return (
    <div className='flex  relative flex-col w-full'>
      <Listbox as={Fragment} value={value} onChange={onChange}>
        {label && (
          <label className='text-xs flex items-center gap-1 text-left text-white font-semibold pl-1'>
            {label}
          </label>
        )}
        <ListboxButton
          disabled={disabled}
          className={`h-10 w-full  text-sm text-body px-3 py-1 outline-none rounded z-10 bg-white disabled:brightness-90 disabled:cursor-not-allowed focus:ring-5 focus:ring-primary/50 flex justify-between items-center
            ${className}`}>
          <span
            data-placholder={!!placeholder}
            data-value={!!value?.[accessorKey]}
            className='data-[placholder=true]:text-darkGray/80 data-[placholder=true]:font-medium 
            !data-[value=true]:font-semibold !data-[value=true]:text-body'>
            {value?.[accessorKey] || placeholder || ''}
          </span>
          <ChevronDown className='size-4 group' />
        </ListboxButton>
        <ListboxOptions
          anchor='bottom'
          transition
          className={`group max-h-52 overflow-y-auto [--anchor-gap:4px] w-[var(--button-width)] shadow-emerald-50  bg-white rounded outline-none z-50 ${containerClass}`}>
          <div className='max-h-52 overflow-y-auto w-full'>
            {options?.length === 0 ? (
              <div className='text-sm font-semibold px-4 py-2 '>
                {emptyText}
              </div>
            ) : (
              options?.map((option) => (
                <ListboxOption
                  key={option?.id}
                  value={option}
                  className='group px-4 py-2 text-sm text-primary font-semibold cursor-auto select-none  outline-none  data-[focus]:bg-primary/20 data-[selected]:bg-primary/20 flex justify-between items-center'>
                  <span>{option?.[accessorKey]}</span>
                  <Check className='invisible group-data-[selected]:visible size-4' />
                </ListboxOption>
              ))
            )}
          </div>
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default UISelector;
