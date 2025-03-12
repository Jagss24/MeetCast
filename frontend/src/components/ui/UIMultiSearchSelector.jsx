import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import React from 'react';
import UiButton from './UiButton';
import UiTextInput from './UiTextInput';
import { Check, ChevronsUpDown, Search } from 'lucide-react';

const UIMultiSearchSelector = ({
  selectedValues,
  onChange,
  options = [],
  label,
  placeholder,
  query,
  setQuery,
  accessorKey = 'name',
  containerClass = '',
  className = '',
  emptyText = 'No data available',
  showCount = 2,
}) => {
  const totalSelected = selectedValues?.length || 0;
  const renderOptions = options?.length
    ? options
    : selectedValues?.length
    ? selectedValues
    : [];
  return (
    <div className='flex  relative flex-col w-full'>
      <Listbox value={selectedValues} onChange={onChange} multiple>
        {label && (
          <label className='text-xs flex items-center gap-1 text-left text-white font-semibold pl-1'>
            {label}
          </label>
        )}
        <ListboxButton
          className={`relative w-full px-3 border border-offWhite h-10 rounded ${className}`}>
          <div className='flex items-center gap-2'>
            {totalSelected ? (
              <>
                {selectedValues?.slice(0, showCount)?.map((value) => (
                  <UiButton
                    key={value?.id}
                    className='px-2 py-0.5 rounded bg-primary/10 h-8 text-black text-sm  text-nowrap'
                    buttonType='tertiary'
                    text={value[accessorKey]}
                  />
                ))}
                {totalSelected > showCount && (
                  <div className='h-6 w-6 rounded-full bg-primary/20 text-primary text-sm font-medium flex items-center justify-center '>
                    +{totalSelected - showCount}
                  </div>
                )}
              </>
            ) : (
              <span className='text-sm text-darkGray/80  font-medium'>
                {placeholder}
              </span>
            )}
            <ChevronsUpDown
              className='size-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray'
              aria-hidden='true'
            />
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor='bottom'
          className=' w-[var(--button-width)] [--anchor-gap:4px]  relative shadow-md border bg-white border-offWhite flex flex-col gap-2 rounded  outline-none z-50 px-2 pt-4 pb-1'>
          <UiTextInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${label?.toLocaleLowerCase()}...  `}
            className='w-full h-8 bg-offWhite/50 ring-1'
            icon={<Search className='size-4' />}
          />
          <div className=' py-2 flex flex-col gap-1 max-h-80 overflow-y-auto'>
            {renderOptions?.length ? (
              renderOptions?.map((optionValue) => {
                return (
                  <ListboxOption
                    value={optionValue}
                    key={optionValue?.id}
                    className='group flex cursor-pointer hover:bg-primary/20 data-[selected]:bg-primary/10 data-[selected]:text-white data-[selected=true]:ring-primary data-[focus]:bg-primary/20 data-[focus]:text-white rounded items-center w-full text-sm font-medium p-2'>
                    <span className='group rounded text-primary h-4 w-4 p-0.5 flex items-center justify-center ring-1 ring-extraLightGray  bg-white'>
                      <Check className='invisible group-data-[selected]:visible size-4 stroke-[3] text-inherit' />
                    </span>
                    <span className={`truncate ml-2 text-primary`}>
                      {String(optionValue?.[accessorKey])}
                    </span>
                  </ListboxOption>
                );
              })
            ) : (
              <p className='text-sm px-2 font-medium text-darkGray'>
                {emptyText}
              </p>
            )}
          </div>
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default UIMultiSearchSelector;
