<?php
/*
This snippent of code is pulled from a section on a website that automatically generates a bootstrap based table with alternating row colors based on data from the website. 
*/
if (have_rows('product_spec_table'))
{
?>
<div class="container-fluid technical-background" style="z-index: 0; margin-top: 2%;">
       <div class="row " id="techinfo"><!-- Technical Information -->
        <div class="col-xs-8 col-xs-offset-4">
            <div class="product-header">MULTIPLE CONFIGURATIONS</div>
        </div>
    </div>
  
    <section id="tab1" class="tab-content active" style="margin-bottom: 5%; box-shadow: 0px 2px 5px #888;">
    	<?php
		
		while( have_rows('product_spec_table') ) { the_row();
			for($x=1;$x<=6;$x++)
			{
				${"spec_col_" . $x} = get_sub_field('spec_col_' . $x);
			}	
		}
		
		$lastColStop = false;
		for($x=6;$x>0;$x--)
		{
			//echo $x . ': ' . ${"spec_col_" . $x};
			if(${"spec_col_" . $x} != '' && !$lastColStop)
			{
				$lastCol = $x;
				$lastColStop = true;
			}
		}
		if($lastCol == 6)
		{
			$rowLabel = 'col-xs-2';
			$rowData = 'col-xs-2';
		}
		elseif($lastCol == 5)
		{
			$rowLabel = 'col-xs-2 col-xs-offset-1';
			$rowData = 'col-xs-2';
		}
		elseif($lastCol == 4)
		{
			$rowLabel = 'col-xs-2 col-xs-offset-2';
			$rowData = 'col-xs-2';
		}
		elseif($lastCol == 3)
		{
			$rowLabel = 'col-xs-3 col-xs-offset-1';
			$rowData = 'col-xs-3 col-sm-offset-1';
		}
		elseif($lastCol == 2)
		{
			$rowLabel = 'col-xs-3 col-xs-offset-3';
			$rowData = 'col-xs-3 col-sm-offset-2';
		}
		elseif($lastCol == 1)
		{
			$rowLabel = 'col-xs-12';
			$rowData = '';
		}
		//echo "last col: " . $lastCol;
		
		$row = 1;
		while( have_rows('product_spec_table') ) { the_row();
			
			for($y=1;$y<=6;$y++)
			{
				${"spec_col_" . $y} = get_sub_field('spec_col_' . $y);
			}
		
			if($row == 1)
			{
				$textClass = 'techspectextbold';
			}
			else
			{
				$textClass = 'techspectext';
			}
		
			if($row % 2 == 0)
			{
				$rowBG = 'greybg';
			}
			else
			{
				$rowBG = 'whitebg';
			}
		
			echo '<div class="row ' . $rowBG . '" style="margin-left: 0px;">';
        	echo '    <div class="' . $rowLabel . '">';
        	echo '        <div class="' . $textClass . '">' . $spec_col_1 . '</div>';
        	echo '    </div>';
		
			for($x=2;$x<=$lastCol;$x++)
			{
				echo '    <div class="' . $rowData . '">';
       			echo '        <div class="' . $textClass . '">' . ${"spec_col_" . $x} . '</div>';
        		echo '    </div>';
			}	
			
			echo '</div>';
			$row++;
			
		}
		?>
    </section>
</div>
<?php
}
?>