import { Box } from '@chakra-ui/react';
import classNames from 'classnames';
import { BaseProps } from '../../../core/interfaces/app-props.interface';
import { GridRow, GridRowSpan } from './grid-row';

export interface ContainerProps extends BaseProps {
  color?: string | string[];
  bg?: string | string[];
  span?: GridRowSpan;
}

export const GridContainer: React.FC<ContainerProps> = ({
  children,
  color,
  bg,
  className,
  span = '12',
}) => {
  return (
    <Box color={color} bg={bg} className={classNames(className)}>
      <Box className="container px-4 mx-auto">
        <GridRow span={span}>{children}</GridRow>
      </Box>
    </Box>
  );
};
