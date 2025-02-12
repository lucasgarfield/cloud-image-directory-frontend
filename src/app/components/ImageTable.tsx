import React, { useEffect } from 'react';
import {
  SearchInput,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Pagination,
  Drawer,
  DrawerContent,
  DrawerContentBody,
  Button
} from '@patternfly/react-core';
import { Table, Thead, Tr, Th, ThProps, Tbody, Td } from '@patternfly/react-table';
import { fetch } from 'cross-fetch'
import { DetailsDrawer } from './DetailsDrawer';
interface ImageData {
  name: string;
  version: string;
  imageId: string;
  provider: string;
  region: string;
  arch: string;
  date: string;
  selflink: URL;
  virt: string;
};

export const ImageTable: React.FunctionComponent = () => {
  const [search, setSearch] = React.useState('');
  const [imageData, setImageData] = React.useState([]);
  const [activeSortIndex, setActiveSortIndex] = React.useState<number | undefined>(undefined);
  const [activeSortDirection, setActiveSortDirection] = React.useState<'asc' | 'desc' | undefined>(undefined);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(20);
  const [isDrawerExpanded, setIsExpanded] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState({});
  const drawerRef = React.useRef<HTMLDivElement>();

  const onDrawerExpand = () => {
    drawerRef.current && drawerRef.current.focus();
  };

  const onDrawerOpenClick = (details: object) => {
    setIsExpanded(true);
    setSelectedImage(details)
  };

  const onDrawerCloseClick = () => {
    setIsExpanded(false);
  };

  const columnNames = {
    name: 'Name',
    provider: 'Provider',
    region: 'Region',
    arch: 'Architecture',
    date: 'Release Date'
  }

  useEffect(() => {
    loadImageData()
  }, [])

  const loadImageData = () => {
    fetch('https://imagedirectory.cloud/images/v2/all', {
      method: 'get',
    })
      .then(res => res.json())
      .then(data => {
        setImageData(data)
      })
  }

  const handleSearch = (event) => {
    setIsExpanded(false);
    setSearch(event.target.value);
    setPage(1);
  };

  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: {
      index: activeSortIndex,
      direction: activeSortDirection
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction);
    },
    columnIndex
  });

  const getSortableRowValues = (image: ImageData): (string | number)[] => {
    const { name, provider, region, arch, date } = image;
    return [name, provider, region, arch, date];
  };

  const onSetPage = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPage: number) => {
    setIsExpanded(false);
    setPage(newPage);
  };

  const onPerPageSelect = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent,
    newPerPage: number,
    newPage: number
  ) => {
    setPerPage(newPerPage);
    setPage(newPage);
  };

  const searchedImageData = imageData.filter((item: ImageData) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedImageData = searchedImageData.slice((page - 1) * perPage, page * perPage)

  let sortedImageData = paginatedImageData;
  if (activeSortIndex !== undefined) {
    sortedImageData = paginatedImageData.sort((a, b) => {
      const aValue = getSortableRowValues(a)[activeSortIndex];
      const bValue = getSortableRowValues(b)[activeSortIndex];
      if (typeof aValue === 'number') {
        // Numeric sort in case we want to add version as a sortable column
        if (activeSortDirection === 'asc') {
          return (aValue as number) - (bValue as number);
        }
        return (bValue as number) - (aValue as number);
      } else {
        // String sort
        if (activeSortDirection === 'asc') {
          return (aValue as string).localeCompare(bValue as string);
        }
        return (bValue as string).localeCompare(aValue as string);
      }
    });
  }

  const panelContent = (
    <DetailsDrawer
      onCloseClick={onDrawerCloseClick}
      drawerRef={drawerRef}
      isExpanded={isDrawerExpanded}
      details={selectedImage} />
  );

  return (
    <React.Fragment>
      <Title headingLevel='h1'>Browse Images</Title>
      <Toolbar id="toolbar-top">
        <ToolbarContent>
          <ToolbarItem variant="search-filter">
            <SearchInput
              onChange={handleSearch}
              id='search'
              placeholder='Search by name'
            />
          </ToolbarItem>
          <ToolbarItem alignment={{
            default: 'alignRight'
          }}>
            <Pagination
              perPageComponent="button"
              itemCount={searchedImageData.length}
              perPage={perPage}
              page={page}
              onSetPage={onSetPage}
              onPerPageSelect={onPerPageSelect}
              isCompact
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      <Drawer isExpanded={isDrawerExpanded} position="right" onExpand={onDrawerExpand}>
        <DrawerContent panelContent={panelContent}>
          <DrawerContentBody>

            <Table
              aria-label="RHEL Cloud Images"
              variant={'compact'}
            >
              <Thead>
                <Tr>
                  <Th sort={getSortParams(0)}>{columnNames.name}</Th>
                  <Th sort={getSortParams(1)}>{columnNames.provider}</Th>
                  <Th sort={getSortParams(2)}>{columnNames.region}</Th>
                  <Th sort={getSortParams(3)}>{columnNames.arch}</Th>
                  <Th sort={getSortParams(4)}>{columnNames.date}</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortedImageData.map((image: ImageData) => (
                  <Tr key={image.name}>
                    <Td dataLabel={columnNames.name}>{image.name}</Td>
                    <Td dataLabel={columnNames.provider}>{image.provider}</Td>
                    <Td dataLabel={columnNames.region}>{image.region}</Td>
                    <Td dataLabel={columnNames.arch}>{image.arch}</Td>
                    <Td dataLabel={columnNames.date}><p>{new Date(image.date).toDateString()}</p></Td>
                    <Td>
                      <Button
                        aria-expanded={isDrawerExpanded}
                        onClick={e => onDrawerOpenClick(image)}
                        variant='link'
                        isInline>
                        Launch now
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>

      <Toolbar id="toolbar-bottom">
        <ToolbarContent>
          <ToolbarItem alignment={{
            default: 'alignRight'
          }}>
            <Pagination
              perPageComponent="button"
              itemCount={searchedImageData.length}
              perPage={perPage}
              page={page}
              onSetPage={onSetPage}
              onPerPageSelect={onPerPageSelect}
              isCompact
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

    </React.Fragment>
  );
};
